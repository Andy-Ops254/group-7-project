import { useState } from "react";

//import usestate to keep track of input value

function ProgressForm() {
    const [note, setNote] = useState("");

  return (
    <form>
      <input type="text" 
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