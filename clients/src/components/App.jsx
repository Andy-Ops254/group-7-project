import { Route } from "react-router";
import {useState, useEffect} from 'react'
import Navbar from "./Navbar";
import GoalList from "./GoalList";
import GoalForm from "./GoalForm";


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
    return (
    <>
        <Navbar />
        <GoalList goalList={goalList} onDelete={handleDelete} />
        <GoalForm  />
    
    </>
    );
}
export default App