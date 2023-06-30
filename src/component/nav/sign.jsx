import React, {  useState } from "react";
import axios from "axios";
// import { useAuth } from "../../context/auth";
const Sign = ({  setLogin,sign,setSign}) => {
  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[cpassword,setCpassword] = useState("")
  // const[passwordMatch,setPasswordMatch] = useState(false)

  // if(password !== cpassword ){
  //   setPasswordMatch(true)
  // }

  const register = async(e) =>{
    e.preventDefault()
    if(password !== cpassword ){
      alert("password and confirm password should be same")
    }
    else{    
      try {

        const {data} =await axios.post("https://full-stack-post-app.vercel.app/auth/register",{
          name,email,password,cpassword
        })
        if(data.existingUser){
          alert(data.message)
        }
        else{
          alert("user created successfully, Now login!!")

        }
      } catch (error) {
        console.error(error)
      }
    }
    
  }


 
    
  return (
    <div>
        {!sign ? (<button onClick={()=>setSign(true)&setLogin(false)}>sing up</button>):( <form style={{textAlign:"center"}} action="" onSubmit={register}>
        <p> sing up</p>
        <input required="true" type="text" placeholder="enter your name" value={name} onChange={(e)=>setName(e.target.value)} /> <br />
        <input required="true" type="text" placeholder="enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} /> <br />
        <input required="true" type="password" placeholder="enter your password"value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
        <input required="true" type="password" placeholder="confirm password" value={cpassword} onChange={(e)=>setCpassword(e.target.value)} /> <br /> 
        {/* {!passwordMatch &&   <small style={{color:"green",textAlign:"center" }}>password missatched</small>  } */}
         <br />
        <button type="submit">sign up</button>
        <button onClick={()=>setSign(false)}>goback</button>
      </form>) }
        
     
    </div>
  );
};

export default Sign;
