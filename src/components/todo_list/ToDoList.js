import React, { useState, useEffect } from 'react'
import './ToDoList.css'
import { db } from '../../firebase.js'
import firebase from "firebase"

export default function ToDoList({user}) {
    const [newTaskValue, setTask] = useState("")
    const [tasks, setTasks] = useState([])


    const today = new Date()
    const todayDate = String(today.getDate()).padStart(2, '0') + "_" + String(today.getMonth() + 1).padStart(2, '0');



    const addTask = (e) => {  //function to add task 
         e.preventDefault();
         db.collection(user.displayName).doc("ToDoList").collection(todayDate).add({
             text: newTaskValue,
             timestamp: firebase.firestore.FieldValue.serverTimestamp()
         })
         setTask('');
     }

     

     
     useEffect(() => {  //function to download task from today.
        if(user!=undefined){   
             db 
                .collection(user.displayName)
                .doc("ToDoList")
                .collection(todayDate) //todayDate
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>{
                    setTasks(snapshot.docs.map((doc) => doc.data()));
                });
            }
       
    }, [user])
    
    
    return (
    <div className="toDoList__wrapper">
    <div className="toDoList__list">
            <ul>
            {tasks.map((task) => (
                    <p>
                        <li>{task.text}</li> 
                    </p>
                )
                
                )}
            </ul>
        
        <div className="toDoList__addTask">
            <input type="text" value={newTaskValue} onChange={e => setTask(e.target.value)}></input>
            <button onClick={addTask}>Add Task</button>
    </div>
    </div>
    </div>
    )
}
