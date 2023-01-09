import React from 'react'
import {useState} from "react";
import { uid } from "uid";
import db from './Fb';
import {ref,set} from "firebase/database";

function Create() {
    const [ task,setTask ] = useState("");
    const [ msg,setMsg ] = useState("");

    const hTask = (event) => {
        setTask(event.target.value);
    }

    const save = (event) => {
        event.preventDefault();
        let id = uid();
        let data = {id,task};
        let r = ref(db,"task/" + id);
        set(r,data);
        setMsg("Task created");
        setTask("");
    }
  return (
    <div>
        <center>
            <h1>Create A Task</h1>
            <br></br>
            
            <form on onSubmit={save}>
                <textarea placeholder='Create A Task' rows={5} cols={30} onChange={hTask} value={task}></textarea>
                <br></br>
                <br></br>
                <input type={"submit"} value="Save Task"></input>
            </form>
            <h2>{msg}</h2>
        </center>
    </div>
  )
}

export default Create