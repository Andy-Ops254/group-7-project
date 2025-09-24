from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates


db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String)
    joined_at = db.Column(db.DateTime, server_default=db.func.now())

    goals = db.relationship('Goal', back_populates='user')
    supports = db.relationship("Supporter", back_populates="user", cascade="all, delete-orphan")

    @validates('email')
    def validate_email(self, key,email):
        if '@' not in email:
            raise ValueError("Invalide email!")
        return email


    def __repr__(self):
        return f"<User name={self.name}, email={self.email}, joined_at={self.joined_at}>"
    
class Goal(db.Model, SerializerMixin):
    __tablename__ = 'goals' 

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)  
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    target_date = db.Column(db.DateTime)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='goals')
    progress_entries = db.relationship("Progress", back_populates="goal", cascade="all, delete-orphan")
    supporters = db.relationship("Supporter", back_populates="goal", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Goal id={self.id}, title={self.title}, user_id={self.user_id}>"



class Progress(db.Model, SerializerMixin):

    __tablename__ = "progress"

    id = db.Column(db.Integer, primary_key=True)  
    goal_id = db.Column(db.Integer, db.ForeignKey("goals.id"), nullable=False)  
    date = db.Column(db.DateTime, server_default=db.func.now())  
    status = db.Column(db.String(50), nullable=False)  
    note = db.Column(db.Text, nullable=True)  

    goal = db.relationship("Goal", back_populates="progress_entries")

    def __repr__(self):
        return f"<Progress id={self.id}, goal_id={self.goal_id}, date={self.date}, status={self.status}>"
#first i start by defining a progress table that will track goal updates
#then i form a unique id for each progress entry
#create a foreign key that links progress entry to a specific goal
#then i date the progress logged
#also set status of progress
#and then put optional notes from the user
#then i set relationships wher each progress entry belongs to one goal


class Supporter(db.Model, SerializerMixin):
    __tablename__ = "supporters"

    id = db.Column(db.Integer, primary_key=True)  
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)  
    goal_id = db.Column(db.Integer, db.ForeignKey("goals.id"), nullable=False)  
    message = db.Column(db.Text, nullable=True)    
    created_at = db.Column(db.DateTime, server_default=db.func.now())  

    user = db.relationship("User", back_populates="supports")
    goal = db.relationship("Goal", back_populates="supporters")

    def __repr__(self):
        return f"<Supporter id={self.id}, user_id={self.user_id}, goal_id={self.goal_id}, message={self.message}>"
#then i define a supporter table that tracks encouragement
#create a unique id for each supporter entry
#then create a foreign key that links which user is supporting
#and a foreign key that links which goal is being supported
#and an optional supportive message left by the user
#and when the support message was created
#then create relationships wher a supporter entry belongs to one user
#and a supporter entry belongs to one goal
