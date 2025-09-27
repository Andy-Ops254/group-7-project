import {useState} from "react";
import GoalCard from "./GoalCard";

//import usestate to keep track of input value

function ProgressForm({goalId}) {
  const[progress, setProgress] = useState({
    "status": "",
    "note": "",
    "date": ""
  })

// on changeeventhandler
  function handleChange(e){
    const{name, value}= e.target
    setProgress({...progress, [name]:value})
  }
  //creating progress data including goal id

  const progressData = {
    ...progress,
    goal_id : goalId,
    date: new Date().toISOString().split('T')[0]
  }
  //submit handles the fetch and clears forms
  function handleSubmit(e) {
    e.preventDefault()
    fetch('http://127.0.0.1:5555/progress', {
      method : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(progressData)
    })
    .then(res => res.json())
    .then(data => {
      setProgress({
        'status': "",
        "date": "",
        "note":""
      })
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
//then add a form submit handler

  return (
    <form onSubmit={handleSubmit}>
      <input
      type="text" 
      name="note"
      placeholder="Log your progress..."
      value={progress.note}
      onChange={handleChange}
      />

      <input
      type = "text"
      name="status"
      placeholder="Status"
      value ={progress.status}
      onChange ={handleChange}
      />
      <button type="submit">Add progress</button>

    </form>
  );
}

export default ProgressForm;
// first i create a form component with an input and button