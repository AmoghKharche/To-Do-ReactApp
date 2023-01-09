import React from 'react'
import { useState,useEffect } from "react"
import db from './Fb'
import { ref,child,get,remove} from "firebase/database"

function Home() {
    const [info,setInfo] = useState([]);

    useEffect(() => {
        const dbref=ref(db);
        get(child(dbref,"task/"))
        .then((snapshot)=>{
            if(snapshot.exists())
            {
                setInfo([]);
                const data=snapshot.val();
                Object.values(data).map((da)=>{
                    setInfo((oldArray) => [...oldArray,da])
                })
            }
            else{
                console.log("No Data Found");
            }
        })
        .catch(err => console.log(err))
    },[])
    const delStu = (id) =>{
        remove(ref(db,"task/" + id))
        .then(() => {
            alert('Task Removed Succesfully');
            window.location.reload();
        })
        .catch((err) => console.log(err))
    }
  return (
    <div>
        <center>
            <h1>Home Page</h1>
            <table border={"5"} style={{width:"60%"}} >
                <tr style={{"text-align":"center"}}> 
                    <th>Task Description</th>
                    <th>Delete</th>
                </tr>
                {
                    info.map((e => 
                       <tr style={{"text-align":"center"}}>
                            <td>{e.task}</td>
                            <td><button onClick={() => {if(window.confirm("Are You Sure?"))
                        delStu(e.id)}}>Delete</button></td>
                       </tr> 
                        ))
                }
            </table>
        </center>
    </div>
  )
}

export default Home 