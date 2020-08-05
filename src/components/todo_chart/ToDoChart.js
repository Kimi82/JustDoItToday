import React, { useState, useEffect } from 'react'
import './ToDoChart.css'
import { db } from '../../firebase.js'
import firebase from "firebase"
import {Bar} from 'react-chartjs-2';
export default function ToDoList({user}) {
    
    const [tasks, setTasks] = useState([])
    const [doneTasks, setAsDone] = useState(0)
    const [doneTaskPercent, setPercent] = useState(1)
    const [chartData, setChartData] = useState([])

    const today = new Date()
    const todayDate = String(today.getDate()).padStart(2, '0') + "_" + String(today.getMonth() + 1).padStart(2, '0'); 



    const GetDates = () => {
      var aryDates = [];
      var dbDates = [];
      for (var i = -6; i <= 0; i++) {
          var currentDate = new Date();
          currentDate.setDate(startDate.getDate() + i);
          aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate());
          dbDates.push(String(currentDate.getDate()).padStart(2, '0') + "_" + String(currentDate.getMonth() + 1).padStart(2, '0'));
      }
  
      return [aryDates, dbDates];
  }

  useEffect(() =>{
    setPercent(doneTasks/tasks.length*100)
   
   },
   [tasks, doneTasks])

  
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
  const dates = GetDates()
  var aryDates = dates[0]; 

//function to return today + 6 past day
const state = {
  labels: [aryDates[0], aryDates[1], aryDates[2],aryDates[3], aryDates[4], aryDates[5], "TODAY"],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [[0,100], [0,60], [0,40], [0,30], [0,70], [10,60]] 
    }
  ]
}
    
    
useEffect(() => {  //function to download task from today.
  const dbDates = dates[1]
   for(let i=0; i<=dbDates.length-1; i++){
      db 
          .collection("Kimi")
          .doc("ToDoList")
          .collection(dbDates[i]) //todayDate
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>{
            setChartData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
                }) 
      }}, [user])  //need to change IT!!!

      function testFunc(){
        console.log(chartData)
      }

    return (
    <div onMouseOver={testFunc} className="toDoChart__wrapper">
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