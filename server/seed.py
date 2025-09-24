from app import app
from models import db, User, Goal, Progress,Supporter
from datetime import datetime
with app.app_context():
    
    db.create_all()
    print("Deleting data...")
    Supporter.query.delete()
    Progress.query.delete()
    Goal.query.delete()
    User.query.delete()
    
    
    print("creating users...")
    users = [
        User(name='Alice Johnson', email='alice@example.com'),
        User(name='Bob Smith', email='bob@example.com'),
        User(name='Charlie Brown', email='charlie@example.com'),
        User(name='Diana Prince', email='diana@example.com'),
        User(name='Ethan Hunt', email='ethan@example.com')
    ]
    db.session.add_all(users)
    db.session.commit()

    print("creating goals...")
    goals = [
            Goal(
                title="Practice daily mindfulness",
                description="Spend 10 minutes each day doing breathing exercises or guided meditation.",
                target_date=datetime(2025, 11, 20),
                user=users[0]
            ),
            Goal(
                title="Journal emotions weekly",
                description="Write a weekly journal entry to reflect on emotional patterns and progress.",
                target_date=datetime(2025, 11, 17),
                user=users[1]
            ),
            Goal(
                title="Attend therapy sessions",
                description="Commit to attending one therapy session every week for the next two months.",
                target_date=datetime(2025, 11, 17),
                user=users[2]
            ),
            Goal(
                title="Establish healthy sleep routine",
                description="Go to bed by 10 PM and wake up by 7 AM consistently for 21 days.",
                target_date=datetime(2025, 12, 10),
                user=users[3]
            ),
            Goal(
                title="Identify personal triggers",
                description="Work with therapist to identify and understand common emotional triggers.",
                target_date=datetime(2025, 9, 10),
                user=users[4]
            )
        ]
    db.session.add_all(goals)
    db.session.commit()

    print("Creating progress entries...")
    progress_entries = [
        Progress(goal=goals[0], status="in-progress", note="Meditation done 5/7 days"),
        Progress(goal=goals[0], status="in-progress", note="Missed one day this week"),
        Progress(goal=goals[1], status="completed", note="First journal entry completed"),
        Progress(goal=goals[2], status="in-progress", note="Attended session last Monday"),
        Progress(goal=goals[3], status="in-progress", note="Bedtime routine followed 3 nights"),
        Progress(goal=goals[4], status="pending", note="Waiting for therapist session")
    ]
    db.session.add_all(progress_entries)
    db.session.commit()

    print("Creating supporter entries...")
    supporter_entries = [
        Supporter(user=users[1], goal=goals[0], message="Keep going, you got this!"),
        Supporter(user=users[2], goal=goals[0], message="Proud of your progress!"),
        Supporter(user=users[0], goal=goals[1], message="Great job keeping up with journaling!"),
        Supporter(user=users[3], goal=goals[2], message="Therapy sessions are important, keep attending!"),
        Supporter(user=users[4], goal=goals[3], message="Stay consistent, your sleep routine matters!"),
    ]
    db.session.add_all(supporter_entries)
    db.session.commit()

    print("Seeding complete!")

