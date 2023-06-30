import React, { useEffect, useState } from "react";
import Create from "./create";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Show = () => {
  const [auth,setAuth] = useAuth();
  const [title, setTitle] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState([]);


 
  // console.log(message)
  // console.log(user)

  const getAllUser = async () => {
    const { data } = await axios.get("https://full-stack-post-app.vercel.app/auth/get");
    if (data) {
      setUser(data.user);
      // set(data.user);
    }

    // console.log(data);
  };

  useEffect(() => {
    getAllUser();
  }, []);



  const getAllPosts = async () => {
    const { data } = await axios.get("https://full-stack-post-app.vercel.app/status/get");
    if (data) {
      setMessage(data.text);
    }

    // console.log(data);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // ---------------------------------------------------------------- creating post

  const create = async (e) => {
    e.preventDefault();
    const user = auth.user._id;
    const name = auth.user.name;

    const { data } = await axios.post(
      "https://full-stack-post-app.vercel.app/status/post",
      { title, user,name },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("userID")).token,
        },
      }
    );
    if (data) {
      // console.log(data);
      alert(data.message);
      setTitle("")
      getAllPosts();
    }
  };

  const onAlert = () => {
    alert("login first");
  };

  // ---------------------------------------------------------------- editing post

  const editHandler = async(_id) => {
     
    const {data} = await axios.put(`https://full-stack-post-app.vercel.app/status/edit/${_id}`,{title},{
      headers: {
        Authorization: JSON.parse(localStorage.getItem("userID")).token,
      },
    })
    if(data){
      alert(data.message)
      setEditModal(false)
      // setMessage(data.text);
      getAllPosts();
    }
    // console.log(_id);
  };

  // ---------------------------------------------------------------- deleting post

  const deleteHandler = async(_id) => {
     
      await axios.delete(`https://full-stack-post-app.vercel.app/status/delete/${_id}`,{
      headers: {
        Authorization: JSON.parse(localStorage.getItem("userID")).token,
      },
    })
    alert("status deleted");
    getAllPosts();
    
    // console.log(_id);
  };



  // let name = localStorage.getItem("userID") ? auth.user.name :auth.user
  return (
    <div className="post" >
      <Create
      message={message}
        title={title}
        setTitle={setTitle}
        create={create}
        onAlert={onAlert}
      />
       <br /> <br />


         <h2 style={{textAlign:"center"}}> All posts</h2>
      
      <div
        style={{
          display:"flex",
          flexWrap:"wrap",
          justifyContent:"space-around",
          height: "fit-content",
          margin: "auto",
        }}
      >  
    
      
        {message.map((m) => {
          return (
            <div  key={m._id} style={{textAlign:"center",width: "350px", height:"300px",border: "1px solid black",margin:"10px 10px"}}>
              
              <p>
                {" "}
                post by <b> {m.name} </b>{" "}
              </p>
              <p>{m.title}</p>
              <br /> <br />
              {auth.token !== "" && (
                <>
                { auth.user._id === m.user ? (<div style={{display:"flex",justifyContent:"center"}}>
              
              {editModal === false ? <button onClick={() => setEditModal(true) }>edit</button> : null }
              {
                editModal ? (
                  <div style={{ display:"flex",flexDirection:"column",gap:"10px"}}>
                  <input required="true" type="text" placeholder="edit your title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                  <button onClick={()=> editHandler(m._id)}>submit</button>
                  <button onClick={()=> setEditModal(false)}>cancel</button>
                  </div> 
                ) :(<button onClick={() => deleteHandler(m._id)}>
                delete
              </button>)
              } <br />
              {" "}
              <br />
          </div>):(null)}
                </>
              )}
              
            </div>
          );
        })}{" "}
      </div></div>
 

      
  
  );
};

export default Show;
