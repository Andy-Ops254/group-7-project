import { Route } from "react-router";
import {useState, useEffect} from 'react'
import Navbar from "./Navbar";
import GoalList from "./GoalList";
import GoalForm from "./GoalForm";
import ProgressForm from "./ProgressForm";
import LandingPage from "./LandingPage";
import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";


function App() {
    //display in app, 
    const[goalList, setgoalList] =useState([])


    useEffect (() =>{
        fetch ('http://127.0.0.1:5555/goals')
        .then(res => res.json())
        .then(response => setgoalList(response))
    },[])

    //deletes the goals using iud
    function handleDelete(id) {
        console.log('Qali')
        fetch(`http://127.0.0.1:5555/goals/${id}`,{
            method:'DELETE',
        })
        // .then (res => res.json())
        .then(r =>{
            if (r.ok) {
                //updates the state of the deleted goal
            setgoalList(goalList.filter(goal=> goal.id!==id));
            }
            else {
                throw new Error('Delete failed');

            }

        })
        .catch(error => {
        console.error('Delete failed:', error);
    });
    }

    //update goal 
    
    function handleUpdateGoal(id, updatedData) {
        console.log(updatedData)
    fetch(`http://127.0.0.1:5555/goals/${id}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
    body: JSON.stringify({
        title :updatedData.title,
        description: updatedData.description,
        target_date : updatedData.target_date
        //specifiesd the fields i want to update
    }),
    })
    .then(res => {
        if (!res.ok) 
        throw new Error('Update failed');
    return res.json();
    })

    .then(updatedGoal => {
    console.log(updatedGoal)
    setgoalList(goalList.map(goal =>
        goal.id === id ? updatedGoal : goal
    ));
    })
    .catch(error => {
    console.error('Update failed:', error);
    });
}

    return (
    <>
        <Navbar />
        <RegisterForm/>
        <LogInForm/>
        {/* <LandingPage /> */}
        <GoalList goalList={goalList} onDelete={handleDelete} onUpdate={handleUpdateGoal}/>
        <GoalForm  />

    
    </>
    );
}
export default App