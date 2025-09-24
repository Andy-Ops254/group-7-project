from flask import Flask, make_response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from models import db  

from models import db, User, Goal, Progress, Supporter

app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mentalwellness.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

@app.route('/')
def index():
    return "WELCOME TO MY WELLNESS APP"

#User routes
@app.route('/users')
def users_list():
    users =[]
    for user in User.query.all():
        user_dict = user.to_dict(only=('id', 'name', 'email', 'joined_at'))
        users.append(user_dict)
    return make_response(users, 200)

@app.route("/new_user", methods=['POST'])
def new_user():
    try:
        data = request.get_json()
        new_user = User(
            name = request.json.get("name"),
            email =request.json.get("email"),
            # joined_at =request.json.get("joined_at")
        )
        db.session.add(new_user)
        db.session.commit()
        response_data = new_user.to_dict()
        return make_response(response_data, 201)

#raises an error when user is not created
    except ValueError as e:
            return make_response({"errors": [str(e)]}, 400)

    
@app.route("/user/'<int:id>", methods=['DELETE', 'PATCH'])
def delete_user(id):
    user = User.query.filter_by(id=id).first()
    if request.method == 'DELETE':
        if user:
            db.session.delete(user)
            db.session.commit()
            response = make_response(
                {"message": "User ahs been deleted!"},
                200
            )
            return response

    elif request.method =='PATCH':
        if user:
            for attr in request.json:
                setattr(user, attr, request.json[attr])
            db.session.add(user)
            db.session.commit()
            user_dict =User.to_dict()
            return make_response(user_dict, 200)
    else:
            response = make_response(
                {"error": "User not"},
                404
            )
    
    #Goals routes
@app.route('/goals')
def goals():
    goals = []
    for goal in Goal.query.all():
        goal_dict = goal.to_dict(only=('id', 'title', 'description', 'created_at', 'target_date'))
        goals.append(goal_dict)
    return make_response(goals, 200)

@app.route('/new_goal', methods=['POST'])
def new_goal():
    data =request.get_json()
    new_user = User(
        title = request.json.get("title"),
        description = request.json.get("description"),
        target_date = request.json.get("target_date")
    )
    db.session.add(new_user)
    db.session.commit()
    response_dict = new_user.to_dict()
    return make_response(response_dict, 201)

@app.route('/goal/<int:id>', methods=['DELETE', 'PATCH'])
def delete_goal(id):

    goal = Goal.query.filter_by(id=id).first()

    if request.method == 'DELETE':
        if goal:
            db.session.delete(goal)
            db.session.commit()
            return make_response(
                {},
                204
            )
        else:
            return make_response(
                {"error": "Goal doesn't exist!"},
                404
            )
    
    if request.method == 'PATCH':
        for attr in request.json:
            setattr(goal, attr, request.json[attr])
        db.session.add(goal)
        db.sessiom.commit()
        goal_dict = goal.to_dict()
        return make_response(goal_dict, 200)
    

#Progress routes

@app.route('/progress', methods=['GET', 'POST'])
def progress():
    if request.method=='GET':
        progress_list= []
        for progress in Progress.query.all():
            progress_dict = progress.to_dict(only=('id', 'date', 'status', 'note'))
            progress_list.append(progress_dict)
        return make_response(progress_list, 200)
    # elif request.method=='POST':
    #     data =request.get_json()
        

@app.route('/progress/<int:id>', methods=['DELETE', 'PATCH'])
def progress_by_id(id):
    progress = Progress.query.filter_by(id=id).first()
    if request.method == 'DELETE':
        if progress:
            db.session.delete(progress)
            db.session.commit()
            response = make_response(
                {},
                204
            )
            return response
        else:
            return make_response(
                {"error": "Progress doesn't exist!"},
                404
            )

    elif request.method == 'PATCH':
        if progress:
            for attr in request.json:
                setattr(progress, attr, request.json[request])
            db.session.add('progress')
            db.session.commit()
            progress_dict = progress.to_dict()
            return make_response(progress_dict, 200)
        else:
            return make_response(
                {"error": "Progress doesn't exist!"},
                404
            )








    
if __name__ == "__main__":
    app.run(port=5555, debug=True)