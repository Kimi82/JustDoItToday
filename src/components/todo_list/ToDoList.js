import React, { useState } from 'react'
import './ToDoList.css'
//import { db } from '../firebase'
//import firebase from "firebase"

export default function ToDoList() {
    const [newTaskValue, setTask] = useState("")


    const addTask = (e) => {
        console.log(newTaskValue)
    } 
    
    
    return (
        <div className="toDoList__wrapper">
        <div className="toDoList__list">
            <ul>
                <li>Zadanie1</li>
                <li>Zadanie2</li>
                <li>Zadanie3</li>
            </ul>
        </div>
        <div className="toDoList__addTask">
            <input type="text" value={newTaskValue} onChange={e => setTask(e.target.value)}></input>
            <button onClick={addTask}>Add Task</button>
        </div>
        </div>
    )
}
