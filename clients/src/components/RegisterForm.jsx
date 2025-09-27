import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';


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
    return res.json()
    })
    .then(response =>{
    console.log('seccess' ,response)
    navigate('/login')
    setRegister({
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
            type="text"
            name ='name'
            value={register.name}
            placeholder='name'
            onChange ={handleChange}
            />

            <input 
            type="text"
            name ='email'
            value={register.email}
            placeholder='email'
            onChange = {handleChange}
            />
            <button type='submit'>Create Account</button>
        </form>
    </div>
  )
}

export default RegisterForm