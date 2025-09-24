import App from './App'

function GoalList({goalList}) {



    return (
        <div>
            <h1>Mental Goals</h1>
            <h2>Manifest your healing</h2>
            <div>
                {goalList.map((goal) =>(
                    key={goal.id}
                    title ={goal.title}
                    description = {goal.description}
                    created_at = {goal.created_at}
                    target_date ={goal.target_date}
                    
                ))}
            </div>
        </div>
    )
}

export default GoalList