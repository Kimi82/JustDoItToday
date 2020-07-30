import React, { useState, useEffect } from 'react'
import './ToDoChart.css'
import { db } from '../../firebase.js'
import firebase from "firebase"
import {Bar} from 'react-chartjs-2';


export default function ToDoList({user}) {
    
    const [tasks, setTasks] = useState([])
    const [doneTasks, setAsDone] = useState(0)

    const today = new Date()
    const todayDate = String(today.getDate()).padStart(2, '0') + "_" + String(today.getMonth() + 1).padStart(2, '0'); 

    //  useEffect(() => {  //function to download task from today.
    //     if(user!==undefined){   
    //          db 
    //             .collection(user.displayName)
    //             .doc("ToDoList")
    //             .collection(todayDate) //todayDate
    //             .orderBy("timestamp", "desc")
    //             .onSnapshot((snapshot) =>{
    //                 setTasks(snapshot.docs.map((doc) => doc.data()));
    //                 setAsDone(snapshot.docs.map((doc) => 
    //                 doc.data.isDone ? doneTasks : doneTasks+1));
    //             });
    //         }
       
    // }, [user])



    const GetDates = () => {
      var aryDates = [];
  
      for (var i = -7; i <= 0; i++) {
          var currentDate = new Date();
          currentDate.setDate(startDate.getDate() + i);
          aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate());
      }
  
      return aryDates;
  }
  
   const DayAsString = (dayIndex) => {
      var weekdays = new Array(7);
      weekdays[0] = "Sunday";
      weekdays[1] = "Monday";
      weekdays[2] = "Tuesday";
      weekdays[3] = "Wednesday";
      weekdays[4] = "Thursday";
      weekdays[5] = "Friday";
      weekdays[6] = "Saturday";
  
      return weekdays[dayIndex];
  }
  
  var startDate = today; 
  var aryDates = GetDates(); 

//function to return today + 6 past day
const state = {
  labels: [aryDates[0], aryDates[1], aryDates[2],aryDates[3], aryDates[4], aryDates[5], 'TODAY'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [[0,100], [0,60], [0,40], [0,30], [0,70]], 
    }
  ]
}
    
    
    return (
    <div className="toDoChart__wrapper">
 <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    </div>
    )
}
