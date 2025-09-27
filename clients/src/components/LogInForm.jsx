import React from "react";
import { useNavigate } from "react-router-dom";
//helps us redirect after login

function LogInForm() {
    const navigate = useNavigate();

    const [logData, setLogData] = useState({
    name: "",
    email: "",
  });
  //then i usestate to store form inputs that is name and email

  function handleChange(e){
    const { name, value } = e.target;
    setLogData({ ...logData, [name]: value });

  }


  return (
    <div>
      <form>
        <input
        name ="name"
        type="text"
        placeholder="Name"
        value={logData.name}
        onChange ={handleChange}
        />
        {/*username input*/}

        <input
        name ="email"
        type ="text"
        placeholder="Email"
        value={logData.email}
        onChange={handleChange}
        />
        {/*email input*/}

        <button type="submit">Log In</button>
        {/*submit button*/}


      </form>
    </div>
  );
}

export default LogInForm;
