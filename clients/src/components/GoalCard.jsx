import React from 'react'
import ProgressForm from "./ProgressForm";

function GoalCard({id ,title, description, created_at, target_date}) {

import App from './App'
import {useState} from 'react'

function GoalCard({title, description, created_at, target_date, id, onDelete, onUpdate}) {

    const [editing, setEditing]= useState(false)
    const [formData, setFormData] = useState({
        title:title,
        description: description,
        target_date: target_date,
    })


    function handleClick() {
        console.log('Finyaa'),
        onDelete(id)
    }

    function toggleEdit() {
        setEditing(!editing)
        
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
                </div>
                <ProgressForm goalId={id} onAddProgress={onAddProgress} />

            </div>
        </div>
        }
        </>
    )
}

export default GoalCard