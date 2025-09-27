import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'


function LogInForm() {
  const navigate = useNavigate();

  const [logData, setLogData] = useState({
    name:"",
    email:""
  });
  // const [email, setEmail] = useState('');
  // const [error, setError] = useState('');

//eventhandler for the input fields
  function handleChange (e){
    const{name, value} = e.target
    setLogData({...logData, [name]:value})
  }

  const logInData = {
    ...logData
  }
  console.log(logData)

  function handleSubmit(e) {
    e.preventDefault()
    fetch('http://127.0.0.1:5555/login',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(logInData)
    })
    .then(res => {
      console.log("Show me the response, res.status")
      if (res.status=== 404) {
    // User not found → redirect to register
    navigate("/register");
    return;
      }
      //checks if loginin is successful
      if(!res.ok) {
            throw new Error("Invalid login");
      }
      return res.json()
    })
    .then(response =>{
      console.log('seccess' ,response)
      navigate('/home')
      setLogData({
        'name': '',
        'email': ''
      })
    })
    //my catch error
    .catch(err => {
    console.log("Invalid username or password", err.message);
  });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
        name= 'name'
        type='text'
        placeholder= 'name'
        value= {logData.name}
        onChange={handleChange}
        />
        <input
        name= 'email'
        type='text'
        placeholder= 'email'
        value= {logData.email}
        onChange={handleChange}
        />
        <button type='submit'>Log In</button>

      </form>
    </div>
  )
}

export default LogInForm