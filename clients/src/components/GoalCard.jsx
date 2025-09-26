import React from 'react'
import App from './App'

function GoalCard({title, description, created_at, target_date, id, onDelete}) {

    function handleClick() {
        console.log('Finyaa'),
        onDelete(id)
    }
    
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
                    <button onClick={handleClick}>Delete</button>
                    <button>Update</button>
                </div>

            </div>
        </div>
    )
}

export default GoalCard