import { useState } from "react";

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
          
        setNote("")  //clears the input field
    }
//then add a form submit handler

  return (
    <form onSubmit={handleSubmit}>
      <input
      type="text" 
      placeholder="Log your progress..."
      value={note}
      onChange={(e) => setNote(e.target.value)} 
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default ProgressForm;
// first i create a form component with an input and button