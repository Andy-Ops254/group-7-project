import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'


function RegisterForm() {
    const navigate = useNavigate();

    const [register, setRegister] = useState({
        name:"",
        email:''
    })
    function handleChange(e) {
    const {name, value} = e.target;
    setRegister({...register, [name]: value});
}

    const registerData = {
        ...register
    }
    function handleSubmit (e){
        e.preventDefault()
        fetch('http://127.0.0.1:5555/users',{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(registerData)
    })
    .then(res => {
        console.log("success",res.status)
        
        if(!res.ok) {
            throw new Error("Invalid login");
    }
    return res.json()
    })
    .then(response =>{
    console.log('seccess' ,response);
            setRegister({
        'name': '',
        'email': ''
    })
        navigate('/login')

    
    })
    //my catch error
    .catch(err => {
    console.log("Invalid username or password", err.message);
});
    }

    
  return (
    <div
        className="register-container"
        style={{
        textAlign: "center",
        marginTop: "40px",
        padding: "30px",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}>
      <h1 className="register-title" style={{ color: "#6a4dad" }}>
        Create Your Account
      </h1>
      <p>Join us and start your wellness journey today!</p>


      <form  className="register-form" onSubmit={handleSubmit}>
            <input 
            className="register-input"
            type="text"
            name ='name'
            value={register.name}
            placeholder='name'
            onChange ={handleChange}
            style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            width: "80%",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required

            />

            <input 
            className="register-input"
            type="text"
            name ='email'
            value={register.email}
            placeholder='email'
            onChange = {handleChange}
            style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            width: "80%",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required

            />
            <button 
            className="register-button"
            type='submit'
            style={{
            padding: "10px 20px",
            marginTop: "15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          >Create Account</button>
        </form>
        <p style={{ marginTop: "20px" }}>
        Already have an Account? <Link to="/login" style={{ color: "#6a4dad", fontWeight: "bold" }}>
        Log In here</Link>
    </p>
    </div>
  )
}

export default RegisterForm