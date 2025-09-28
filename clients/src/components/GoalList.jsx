import App from './App'
import GoalCard from './GoalCard'

function GoalList({goalList, onDelete,onUpdate}) {

    return (
        <div className="goal-list-container">
            <h1 className="goal-list-title"> 🌟Mental Goals 🌟</h1>
            <h2 className="goal-list-subtitle">Every step counts toward your success</h2>
            <div className="goal-list-grid">
                {goalList.map((goal) =>(
                    <GoalCard key={goal.id}
                    title ={goal.title}
                    description = {goal.description}
                    target_date ={goal.target_date}
                    created_at = {goal.created_at}
                    id = {goal.id}
                    onDelete= {onDelete}
                    onUpdate={onUpdate}
                    />
                ))}
            </div>
        </div>
    )
}

export default GoalList