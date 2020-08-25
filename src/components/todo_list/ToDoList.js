import React, { useState, useEffect, useRef, useLayoutEffect} from 'react'
import './ToDoList.css'
import { db } from '../../firebase.js'
import firebase from "firebase"

export default function ToDoList({user}) {
     const [newTaskValue, setTask] = useState("");
     const [tasks, setTasks] = useState([]);
     const [doneTasks, setTaskDone] = useState()
    
    const today = new Date()
    const todayDate = String(today.getDate()).padStart(2, '0') + "_" + String(today.getMonth() + 1).padStart(2, '0');



    const addTask = (e) => {  //function to add task 
         e.preventDefault();
         db.collection(user.displayName).doc("ToDoList").collection(todayDate).add({
             text: newTaskValue,
             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
             isDone: false
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
                    setTasks(snapshot.docs.map(doc => ({
                        id: doc.id,
                        task: doc.data()
                        })));
                        }) 
            } 
       
    }, [user])


    const useIsMount = () => { //function to return, than first render or no
        const isMountRef = useRef(true);
        useEffect(() => {
          isMountRef.current = false;
        }, []);
        return isMountRef.current;
      };

    
        const isMount = useIsMount();
      
        useEffect(() => {
          if (!isMount && tasks.length>=1) {
            let howManyTaskIsDone = 0;
            for(let i =0; i<=tasks.length-1; i++){
                 if(tasks[i].task.isDone == true){
                    howManyTaskIsDone+=1
                    setTaskDone(howManyTaskIsDone);
                    }
            } 
          }
        }, [tasks]);
      


    

        

    const setAsDone = (e) => {
        db.collection(user.displayName).doc("ToDoList").collection(todayDate).doc(e.target.id)
        .update({isDone: true})
    }
    

    
    return (
    <div className="toDoList__wrapper">{ user.displayName?
    <div className="toDoList__list">
            <ul>
            {tasks.map((task) => (
                    <p> { task.task.isDone ?
                        <li className="toDoList__item" value={task.task.text} id={task.id} onClick={setAsDone}>{task.task.text}</li>:
                        <li value={task.task.text} id={task.id} onClick={setAsDone}>{task.task.text}</li> 
                        }
                    </p>
                )
                
                )}
            </ul>
        
        <div className="toDoList__addTask">
            <input className="toDoList__input" type="text" value={newTaskValue} onChange={e => setTask(e.target.value)}></input>
            <button className="toDoList__button" onClick={addTask}><b>ADD TASK</b></button>
        </div>
    </div>
:<h1>Please refresh the page</h1>}</div>
    )


} 