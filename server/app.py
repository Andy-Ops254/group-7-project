from flask import Flask, make_response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from models import db, User, Goal, Progress, Supporter

app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mentalwellness.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)


@app.route('/')
def index():
    return "WELCOME TO MY WELLNESS APP"

#User routes
@app.route('/users', methods = ['GET'])
def users_list():
    users =[u.to_dict() for u in User.query.all()]
    return make_response(users, 200)

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    user_dict = user.to_dict()
    return make_response(user_dict, 200)


    
@app.route("/users", methods=['POST'])
def new_user():
    try:
        data = request.get_json()
        new_user = User(
            name = data.get("name"),
            email =data.get("email"),
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
            user_dict =user.to_dict()
            return make_response(user_dict, 200)
    else:
            response = make_response(
                {"error": "User not found"},
                404
            )
        return response
    
    #Goals routes
@app.route('/goals')
def goals_list():
    goals = []
    for goal in Goal.query.all():
        goal_dict = goal.to_dict(only=('id', 'title', 'description', 'created_at', 'target_date'))
        goals.append(goal_dict)
    return make_response(goals, 200)

@app.route('/goals', methods=['POST'])
def new_goal():
    data =request.get_json()
    new_goal = Goal(
        title = request.json.get("title"),
        description = request.json.get("description"),
        target_date = request.json.get("target_date")

    )
    db.session.add(new_goal)
    db.session.commit()
    goal_dict=new_goal.to_dict()
    return make_response(goal_dict, 200)


@app.route('/goals/<int:id>', methods=['DELETE', 'PATCH'])
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
        allowed_fields = ["title", "description", "target_date"]
        for attr, value in request.json.items():
            if attr in allowed_fields:
                setattr(goal, attr, value)

        
        db.session.add(goal)
        db.session.commit()
        goal_dict = goal.to_dict()
        return make_response(goal_dict, 200)
    

#Progress routes

@app.route('/progress', methods=['GET', 'POST'])
def progress_list():

    def progress():
        if request.method=='GET':
            progress_list= []
            for progress in Progress.query.all():
                progress_dict = progress.to_dict(only=('id', 'date', 'status', 'note'))
                progress_list.append(progress_dict)
            return make_response(progress_list, 200)

        elif request.method=='POST':
            data = request.get_json()
            new_progress = Progress(
                goal_id = data.get("goal_id"),
                status = data.get("status"),
                date = data.get("date")
            )
        db.session.add(new_progress)
        db.session.commit()
      
        progress_dict=new_progress.to_dict()
        return make_response(progress_dict, 201)
    
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
                setattr(progress, attr, request.json[attr])
            db.session.add('progress')

            db.session.commit()
            progress_dict = progress.to_dict()
            return make_response(progress_dict, 200)
        else:
            return make_response(
                {"error": "Progress doesn't exist!"},
                404
            )
        
@app.route('/support/<int:goal_id>', methods=['GET'])
def list_support(goal_id):
    Goal.query.get_or_404(goal_id)
    supporters = Supporter.query.filter_by(goal_id=goal_id).order_by(Supporter.created_at.desc()).all()
    response = {
        "message": "Supporters fetched successfully",
        "goal_id": goal_id,
        "supporters": [s.to_dict() for s in supporters]
    }
    return make_response(jsonify(response), 200)

#first i create a route to list all supporters for a given goal
#then i ensure the goal exist
#then i fetch all supporters linked to the goal from newest first
#then  i build a general response dictonary with a message ,goal id and the suporters data
#then wrap the response in make response

@app.route('/support/<int:goal_id>', methods=['POST'])
def add_support(goal_id):
    Goal.query.get_or_404(goal_id)
    data = request.get_json() or {}
    user_id = data.get('user_id')
    if not user_id:
        return make_response(jsonify({"error": "user_id required"}), 400)
    
    user = User.query.get(user_id)
    if not user:
        return make_response(jsonify({"error": "user not found"}), 404)
      
    supporter = Supporter(
        user_id=user_id,
        goal_id=goal_id,
        message=data.get('message')
    )
    db.session.add(supporter)
    db.session.commit()

    response = {
        "message": "Supporter added successfully",
        "supporter": supporter.to_dict()
    }

    return make_response(jsonify(response), 201)

#then i create a route to add a supporter to a goal
#ensure the goal exist
#then get the json data from the request body
#then extract user id 
#then i ensure the user exists
#then i create a new supporter record
#then save supporter to database
#then build a success response with a message and the newly created supporters data

  

if __name__ == "__main__":
    app.run(port=5555, debug=True)