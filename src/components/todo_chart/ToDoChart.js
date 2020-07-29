import React, { useState, useEffect } from 'react'
import './ToDoChart.css'
import { db } from '../../firebase.js'
import firebase from "firebase"
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalRectSeries
  } from 'react-vis';

export default function ToDoList({user}) {
    
    const [tasks, setTasks] = useState([])

    const today = new Date()
    const todayDate = String(today.getDate()).padStart(2, '0') + "_" + String(today.getMonth() + 1).padStart(2, '0'); 

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


    const timestamp = new Date('MAY 23').getTime();
    const ONE_DAY = 86400000;

const DATA = [
  {x0: ONE_DAY * 2, x: ONE_DAY * 3, y: 1},
  
].map(el => ({x0: el.x0 + timestamp, x: el.x + timestamp, y: el.y}));
    
    
    return (
    <div className="toDoChart__wrapper">
            <XYPlot
      xDomain={[timestamp - 2 * ONE_DAY, timestamp + 30 * ONE_DAY]}
      yDomain={[0, 100]}
      xType="time"
      width={800}
      height={300}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <VerticalRectSeries data={DATA} style={{stroke: '#fff'}} />
    </XYPlot>
    </div>
    )
}
