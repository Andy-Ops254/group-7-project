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
    return jsonify(users), 200

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict()), 200

    
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
        return jsonify(new_user.to_dict()), 201
#raises an error when user is not created
    except Exception as e:
        return jsonify({"errors": [str(e)]}), 400
    
@app.route("/users/<int:id>", methods=['DELETE'])
def delete_user(id):
    user = User.query.filter_by(id=id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        response = make_response(
            {"message": "User has been deleted!"},
            200
        )
        return response
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
    return jsonify(goals), 200

@app.route('/goals', methods=['POST'])
def new_goal():
    data =request.get_json()
    new_goal = Goal(
        title = data.get("title"),
        description = data.get("description"),
        target_date = data.get("target_date")
    )
    db.session.add(new_goal)
    db.session.commit()
    return jsonify(new_goal.to_dict()), 201


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
    if request.method == 'GET':
        progress_list = [p.to_dict() for p in Progress.query.all()]
        return jsonify(progress_list), 200
    
    if request.method == 'POST':
        data = request.get_json()
        new_progress = Progress(
            goal_id = data.get("goal_id"),
            status = data.get("status"),
            date = data.get("date")
        )
        db.session.add(new_progress)
        db.session.commit()
        return jsonify(new_progress.to_dict()), 201
    
       
@app.route('/progress/<int:id>', methods=['DELETE', 'PATCH'])
def progress_by_id(id):
   progress = Progress.query.get_or_404(id)
   if not progress:
    return jsonify({"error": "Progress not found"}), 404

   if request.method == 'DELETE':
        db.session.delete(progress)
        db.session.commit()
        return {}, 204

   if request.method == 'PATCH':
        allowed_fields = ["status", "date"]
        for attr, value in request.json.items():
            if attr in allowed_fields:
                setattr(progress, attr, value)

        if hasattr(progress, "status") and progress.status not in ["on track", "missed", "completed"]:
            return jsonify({"error": "Invalid status"}), 400 
        db.session.commit()
        return jsonify(progress.to_dict()), 200 
    
if __name__ == "__main__":
    app.run(port=5555, debug=True)