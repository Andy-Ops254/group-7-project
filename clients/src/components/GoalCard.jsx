import React from 'react'

function GoalCard({title, description, created_at, target_date}) {
    
    return (
        <div>
            <h2>Begin your journey....</h2>
            <div>
                <h2> Title: {title}</h2>
                <p>description: {description} </p>
                <p>created_at: {created_at} </p>
                <p> target_date: {target_date} </p>

            </div>
        </div>
    )
}

export default GoalCard