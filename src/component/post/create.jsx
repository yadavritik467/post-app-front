import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../../context/auth';


const Create = ({title,setTitle,create,onAlert}) => {
  
  const [auth] = useAuth(); 

  
  return (
    <div>
      <p>Create your post</p>
      <div  onSubmit={create}>
        <input required="true" type="text" placeholder='write your text here' value={title} onChange={(e)=>setTitle(e.target.value)} />
        {auth.token !== "" ? (<button onClick={create}>post</button>) : (<button onClick={onAlert}>post</button>)}
        
        
      </div>
    </div>
  )
}

export default Create
