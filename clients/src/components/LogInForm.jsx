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
    function handleSubmit(e) {
    e.preventDefault(); // prevent page reload

    fetch("http://127.0.0.1:5555/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logData),
    })
      .then((res) => {
        if (res.status === 404) {
          navigate("/register");//if user not found  go to register page
          return;
        }
        if (!res.ok) {
          throw new Error("Invalid login");
        }
        return res.json();
      })
      .then((response) => {
        console.log("Login success:", response);
        navigate("/home"); // redirect to home
        setLogData({ name: "", email: "" });
      });
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
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
