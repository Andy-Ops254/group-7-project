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
      <p>works</p>
    </div>
  );
}

export default LogInForm;
