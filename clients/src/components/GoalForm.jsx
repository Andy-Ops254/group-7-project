import React from 'react'
import {useState} from 'react'

function GoalForm() {
    const[formData,setFormData] = useState({
        title :"",
        description:"",
        target_date: ""
    })

    function handleChange(e) {
        console.log('really')
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
    }
        // console.log("sioni shit")

        
    function handleSubmit(e) {
        console.log("Kimoda!")
        e.preventDefault()
        fetch ('http://127.0.0.1:5555/goals',{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(response => {
            console.log("success", response);
            setFormData({
                title: "",
                description: "",
                target_date: ""
            });
        })
        .catch(error => {
        console.error('Error:', error);
    });
}

    return (
        <div className="goal-form-container">
        <h2 className="goal-form-title">✨Turning dreams into achievements✨</h2>
        <form onSubmit={handleSubmit} className="goal-form">
            <label className="goal-form-label">Title</label>
            <input 
            type="text" 
            name= "title"
            value = {formData.title}
            onChange ={handleChange}
            placeholder='Title'
            
            />
            <label className="goal-form-label">Description</label>
            <input 
            type="text" 
            name= "description"
            value = {formData.description}
            onChange ={handleChange}
            placeholder='description'
            />
            <label className="goal-form-label">Target Date</label>
            <input 
                type="datetime-local" 
                name="target_date"
                value={formData.target_date}
                onChange={handleChange}
                placeholder="Select target date"

             />
             <button type="submit" className="goal-form-button"> Add Goal</button>

        </form>
        </div>
    )
}

export default GoalForm