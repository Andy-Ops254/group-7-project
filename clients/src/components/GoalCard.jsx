import React from 'react'
import ProgressForm from "./ProgressForm";

function GoalCard({id ,title, description, created_at, target_date}) {
    
    return (
        <div>
            <h2>"Healing happens one step at a time"</h2>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <h4>Created:{created_at} </h4>
                <h4> Target: {target_date} </h4>
                <div>
                    <button>Add message</button>
                    <button>Delete</button>
                    <button>Update</button>
                </div>
                <ProgressForm goalId={id} onAddProgress={onAddProgress} />

            </div>
        </div>
    )
}

export default GoalCard