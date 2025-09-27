import React from 'react'
import{useState} from 'react'
import App from './App'
import ProgressForm from "./ProgressForm";


function GoalCard({title, description, created_at, target_date, id, onDelete, onUpdate}) {

    const [editing, setEditing]= useState(false)
    const [formData, setFormData] = useState({
        title:title,
        description: description,
        target_date: target_date,
        
    })
    const [expanded, setExpanded]= useState(false)
    const [progress, setProgress] = useState([])


    function handleClick() {
        console.log('Finyaa'),
        onDelete(id)
    }

    function toggleEdit() {
        setEditing(!editing)
        
    }

    function showProgress() {
        console.log("finya")
        fetch(`http://127.0.0.1:5555/goals/${id}/progress`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setProgress(data)
            setExpanded(!expanded)
        })
    }

    
    return (
        <>
        { editing &&
        <div>
            <h2>"Healing happens one step at a time"</h2>
            <form onSubmit={(e) => {
                e.preventDefault()
                onUpdate(id,{
                    title: e.target.title.value,
                    description: e.target.description.value,
                    target_date: e.target.target_date.value
                })
                setEditing(!editing)
            }}>
                <input 
                type="text"
                name="title"
                value={formData.title}
                placeholder= "title"
                onChange={(e) => setFormData({...formData,title:e.target.value})}
                /> 
                <input 
                type="text"
                name="description"
                value={formData.description}
                placeholder='description'
                onChange={(e) => setFormData({...formData,description:e.target.value})}
                />
                <input 
                type="text"
                name="target_date"
                value={formData.target_date}
                placeholder='target_value'
                onChange={(e) => setFormData({...formData,target_date:e.target.value})}
                />
                <button type="submit">Save</button>
            </form>

        </div>
        }
        
        { !editing && 
        <div>
            <h2>"Healing happens one step at a time"</h2>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <h4>Created:{created_at} </h4>
                <h4> Target: {target_date} </h4>
                <div>
                    {/* <button>Add message</button> */}
                    <button onClick={handleClick}>Delete</button>
                    <button onClick = {toggleEdit}>Update</button>
                    <button onClick= {showProgress}>show progress</button>
                </div>
                {/* <ProgressForm goalId={id} onAddProgress={onAddProgress} /> */}

            </div>
        </div>
        }


        { expanded &&
        <div>
            <ProgressForm goalId={id}/>
            <h3>Progress History</h3>
            {progress.map((progressItem) => {
        return (<div key={progressItem.id}>
            <p>Status: {progressItem?.status}</p>
            <p>Note: {progressItem?.note}</p>
            <p>Date: {progressItem?.date}</p>
        </div>)
    })}

    
        {/* <div>
            nullish coalesing 
            <p>Status: {progress?.status}</p>
            <p>Note: {progress?.note}</p>
            <p>Date: {progress?.date}</p>
        </div>
     */}
        
        </div>
        }

        </>
    )
}

export default GoalCard