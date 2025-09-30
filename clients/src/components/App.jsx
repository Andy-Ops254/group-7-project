
// import { Route } from "react-router";
// import { Routes, Route } from "react-router-dom";
import {useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from "./Navbar";
import GoalList from "./GoalList";
import GoalForm from "./GoalForm";
import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";
import "../App.css";



function App() {
    //display in app, 
    const[goalList, setgoalList] =useState([])
    const [user, setUser] = useState(null);



    useEffect (() =>{
        fetch ('/goals')
        .then(res => res.json())
        .then(response => setgoalList(response))
    },[])

    //stay logged in
    useEffect(() => {
    fetch('/check_session', {
    credentials: 'include'
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error();
    })
    .then(user => setUser(user))
    .catch(() => setUser(null));
}, []);

//logout user
function handleLogout() {
    setUser(null); 
    }


    //deletes the goals using iud
    function handleDelete(id) {
        console.log('Qali')
        fetch(`/goals/${id}`,{
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
    fetch(`/goals/${id}`, {
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
        <Navbar onLogout={handleLogout}/>
        <Routes>
            <Route path = '/' element={<LogInForm setUser={setUser}/>} />
            <Route path = '/register' element={<RegisterForm/>} />
            <Route path="/login" element={<LogInForm />} />
            <Route path="/home" element={<GoalList goalList={goalList} onDelete={handleDelete} onUpdate={handleUpdateGoal}/>} />
            <Route path = "/goalform" element={<GoalForm  />} />
        </Routes>
    
    </>
    );
}
export default App