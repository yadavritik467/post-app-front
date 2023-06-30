import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Login = ({ login,setLogin,setSign }) => {
   const[auth,setAuth]=useAuth()
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  
  const onLogin = async (e) => {
    e.preventDefault();

    

    try {
   
      const response = await axios.post(
        "https://full-stack-post-app.vercel.app/auth/login",
        {
          email,
          password,
        }
      );

      setAuth({
        ...auth,
        user: response.data.user,
        token: response.data.token,
      });
    

      localStorage.setItem("userID", JSON.stringify(response.data));
      alert("Login succesfully");

    } catch (error) {
      console.log(error);
      alert("user not found !!!");
      
    }
  };


  return (
    <div>
        {!login ? ( <button onClick={()=>setLogin(true) & setSign(false)}>login</button>): (  
        
        <form action="" onSubmit={onLogin}>
        <p>login</p>

        <input required="true" type="text" placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} /> <br />
        <input required="true" type="password" placeholder='enter your password' value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
        <button type='submit'>login</button>
        <button onClick={()=>setLogin(false)}>goback</button>
     </form>
     
     )}
       
   
    </div>
  )
}

export default Login
