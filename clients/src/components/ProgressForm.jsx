import {useState} from "react";
import GoalCard from "./GoalCard";

//import usestate to keep track of input value

function ProgressForm({goalId}) {
  const[progress, setProgress] = useState([])
  

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
    fetch('/progress', {
      method : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(progressData)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Progress data from backend:", progress);

          console.log("API response:", data);

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
    <form className="progress-form"  onSubmit={handleSubmit}>
  <input
    type="text"
    name="note"
    placeholder="✨Log your progress..."
    value={progress.note}
    onChange={handleChange}
    className="progress-input"
  />

  <p>Status:</p>
  <div className="progress-status-options">
  <label>
    <input
      type="radio"
      name="status"
      value="complete"
      checked={progress.status === "complete"}
      onChange={handleChange}
    />
    Complete
  </label>

  <label>
    <input
      type="radio"
      name="status"
      value="incomplete"
      checked={progress.status === "incomplete"}
      onChange={handleChange}
    />
    Incomplete
  </label>

  <label>
    <input
      type="radio"
      name="status"
      value="in progress"
      checked={progress.status === "in progress"}
      onChange={handleChange}
    />
    In Progress
  </label>
 </div>

  <button type="submit" className="btn add-progress-btn">
    Add Progress
    </button>
</form>

  );
}

export default ProgressForm;
// first i create a form component with an input and button