import {useState} from "react";

//import usestate to keep track of input value

function ProgressForm({ goalId, onAddProgress }) {
    const [note, setNote] = useState("");

    function handleSubmit(e) {
        e.preventDefault(); //prevents page reload

      const newProgress = {
        goal_id: goalId, // link to goal
        note: note, // the typed note
        date: new Date().toISOString(), // current timestamp
    };
    fetch("http://localhost:5555/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProgress),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddProgress(data);
          
        setNote("")  //clears the input field
    });

 }
//then add a form submit handler

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <input
      type="text" 
      placeholder="Log your progress..."
      value={note}
      onChange={(e) => setNote(e.target.value)} 
      />
      <button type="submit">Add progress</button>

    </form>
  );
}

export default ProgressForm;
// first i create a form component with an input and button