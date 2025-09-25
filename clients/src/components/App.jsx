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
    return (
    <>
        <Navbar />
        <GoalList goalList={goalList} />
        <GoalForm />
    
    </>
    );
}
export default App