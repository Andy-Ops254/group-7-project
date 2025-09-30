from flask import Flask, make_response, jsonify, request, send_from_directory, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from datetime import datetime
from models import db, User, Goal, Progress, Supporter
import os
from dotenv import load_dotenv

load_dotenv ()


app = Flask(__name__, static_folder='../clients/dist', static_url_path='')
# app.secret_key = 'super_secret_123'
app.secret_key = os.getenv("SECRET_KEY", "fallback-secret")


app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///mentalwellness.db')
print(app.config['SQLALCHEMY_DATABASE_URI'])
print("Database URI:", app.config["SQLALCHEMY_DATABASE_URI"])


app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)
CORS(app, supports_credentials=True)


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

# @app.route('/')
# def index():
#     return "WELCOME TO MY WELLNESS APP"

#User routes
@app.route('/users', methods = ['GET'])
def users_list():
    user_list=[]
    for user in User.query.all():
        user_dict = user.to_dict(only=('name', 'email'))
        user_list.append(user_dict)
    return make_response(user_list, 200)

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.filter_by(id=id).first()
    user_dict = user.to_dict(only=('name', 'email'))
    return make_response(user_dict, 200)


    
@app.route("/users", methods=['POST'])
def new_user():
    try:
        data = request.get_json()
        name = data.get("name")
        email =data.get("email")
#queries if user exists
        user_exists =User.query.filter_by(name=name, email=email).first()
        if user_exists:
            return make_response({"error": "User Already exists!!"})
        # if user doesnt exists create an ew user
        new_user = User(
            name = name,
            email = email
        )
        db.session.add(new_user)
        db.session.commit()
        response_data = new_user.to_dict(only=('name', 'email'))
        return make_response(response_data, 201)

#raises an error when user is not created
    except ValueError as e:
            return make_response({"errors": [str(e)]}, 400)

#login route, that checks if user and email exists

@app.route('/login', methods=["POST"])
def log_in():
    data = request.get_json()
    name=data.get('name')
    email =data.get('email')
    
    # print(name)
    # print(email)
    #condition to check if both have been inputed
    if not name or not email:
        return make_response({
            'error':"Wrong user details, please retry"},
            400
            )
    #this will check if thge user exists
    user = User.query.filter_by(name=name, email=email).first()
    # print(user)
    #storing user in session
    if user:
        session['user_id']=user.id
        return user.to_dict(only=('name', 'email')),200
    else:
        return{'error': 'user not found'}, 404
    # if not user:
    #     return make_response(
    #         {'error': "User does not exist!"},
    #         404
    #     )
    # return make_response(user.to_dict(only=('name', 'email')),200)

    #check session endpoint- helps with logging out
@app.route('/check_session', methods=['GET', 'DELETE'])
def check_session():
    user_id= session.get('user_id')
    if user_id:
        user= User.query.get(user_id)
        return make_response(user.to_dict(only=('name', 'email')),200)
    else:
        return({"error": "Your are not logged in!"}, 401)
#logout logic
@app.route('/logout', methods=["DELETE"])
def logout():
    # clears the session
    session.pop('user_id', None)
    return {}, 204
        
@app.route("/users/<int:id>", methods=['DELETE', 'PATCH'])
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
            user_dict =user.to_dict(only=('name', 'email'))
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
    date = datetime.fromisoformat(data.get("target_date"))
    new_goal = Goal(
        title = data.get("title"),
        description = data.get("description"),
        target_date = date
    )
    db.session.add(new_goal)
    db.session.commit()
    goal_dict=new_goal.to_dict(only=('title', 'description', 'target_date'))
    return make_response(goal_dict, 201)


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
            if attr in ['target_date', 'created_at']:
                value = datetime.fromisoformat(value) 

            if attr in allowed_fields:
                setattr(goal, attr, value)

        
        db.session.add(goal)
        db.session.commit()
        goal_dict = goal.to_dict(only=('id','title', 'description', 'target_date', 'created_at'))
        return make_response(goal_dict, 200)
    

#Progress routes

@app.route('/progress', methods=['GET', 'POST'])
def progress_list():
    if request.method=='GET':
        progress_list= []
        for progress in Progress.query.all():
            progress_dict = progress.to_dict(only=('goal_id', 'date', 'status', 'note'))
            progress_list.append(progress_dict)
        return make_response(progress_list, 200)
    elif request.method=='POST':
        data = request.get_json()
        date = datetime.fromisoformat(data.get("date"))

        new_progress = Progress(
            goal_id = data.get("goal_id"),
            status = data.get("status"),
            date = date,
            note =data.get("note")
        )
        db.session.add(new_progress)
        db.session.commit()
    
    progress_dict=new_progress.to_dict(only=('goal_id', 'status', 'date'))
    return make_response(progress_dict, 201)
    
    #     data =request.get_json()
        

@app.route('/progress/<int:id>', methods=['DELETE', 'PATCH', 'GET'])
def progress_by_id(id):
    progress_id = Progress.query.filter_by(id=id).first()
    if request.method == 'DELETE':
        if progress_id:
            db.session.delete(progress_id)
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
        if progress_id:
            for attr in request.json:
                setattr(progress_id, attr, request.json[attr])
            # db.session.add('progress_id')

            db.session.commit()
            progress_dict = progress_id.to_dict(only=('goal_id', 'date', 'status', 'note'))
            return make_response(progress_dict, 200)
        else:
            return make_response(
                {"error": "Progress doesn't exist!"},
                404
            )
@app.route('/goals/<int:id>/progress')
def progress_id_goals(id):
    progress = Progress.query.filter_by(goal_id=id).all()
    print(progress)
    if progress:
        progress_dict = [{
            'status': progress.status,
            'note' : progress.note,
            'date': progress.date,
            'id':progress.id
        } for progress in progress] #converting this into a object
        return make_response(progress_dict, 200)
    else:
        return make_response(
            [],
            200
        )


@app.route('/support/<int:goal_id>', methods=['GET'])
def list_support(goal_id):
    Goal.query.get_or_404(goal_id)
    supporters = Supporter.query.filter_by(goal_id=goal_id).order_by(Supporter.created_at.desc()).all()
    response = {
        "message": "Supporters fetched successfully",
        "goal_id": goal_id,
        "supporters": [s.to_dict(only=('user_id' ,'goal_id', 'message','created_at')) for s in supporters]
    }
    return make_response(response, 200)

#first i create a route to list all supporters for a given goal
#then i ensure the goal exist
#then i fetch all supporters linked to the goal from newest first
#then  i build a general response dictonary with a message ,goal id and the suporters data
#then wrap the response in make response



@app.route('/support', methods=['POST'])
def add_support():
    data = request.get_json()

    supporter = Supporter(
        user_id=data.get('user_id'),
        goal_id=data.get('goal_id'),
        message=data.get('message')
    )
    db.session.add(supporter)
    db.session.commit()

    supporter_dict = supporter.to_dict(only=('user_id' ,'goal_id', 'message'))
    return make_response(supporter_dict, 201)
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