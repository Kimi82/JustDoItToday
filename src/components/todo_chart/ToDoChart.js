import React, { useState, useEffect, useRef  } from 'react'
import './ToDoChart.css'
import { db } from '../../firebase.js'
import {Bar} from 'react-chartjs-2';
export default function ToDoList({user}) {
    
    const [tasks, setTasks] = useState([])
    const [doneTasks, setTaskDone] = useState(0)
    const [doneTaskPercent, setPercent] = useState(1)
    const [chartData, setChartData] = useState([])
    const [chartDataExist, setChartDataExist] = useState(false)

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
  var aryDates = dates[0]


  const createChartObject = () => {
    const chartFinalArray = [
      {
        id: dbDates[0],
        allTasks: 0,
        doneTasks:0
      },
      {
        id: dbDates[1],
        allTasks: 0,
        doneTasks:0
      },
      {
        id: dbDates[2],
        allTasks: 0,
        doneTasks:0
      },
      {
        id: dbDates[3],
        allTasks: 0,
        doneTasks:0
      },
      {
        id: dbDates[4],
        allTasks: 0,
        doneTasks:0
      },
      {
        id: dbDates[5],
        allTasks: 0,
        doneTasks:0
      },
      {
        id: dbDates[6],
        allTasks: 0,
        doneTasks:0
      }
    ]
    return chartFinalArray
    }

  useEffect(() => {  //function to download task from today.
    if(user!=undefined){  
      try{ 
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
        }catch(error){console.log("noway")}} 
   
}, [])
const dbDates = dates[1].reverse()
const chartArray = []

useEffect(() => {  //function to download task from week.
  if(user!=undefined){
    for(let i=0; i<=dbDates.length-1; i++){
      try{
         db 
          .collection(user.displayName)
          .doc("ToDoList")
          .collection(dbDates[i]) //todayDate
          .orderBy("timestamp", "desc")
          .get()
          .then(snapshot =>{
            ((snapshot.docs.map(async doc => {
                  chartArray.push({id:doc.id, data: doc.data()})
                  setChartData(chartArray)
                  })));
                  
                })

        }catch{console.log("no")}}}}, [])  //need to change IT!!!



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

      function hoverTest(){
        
        var chartFinalArray = [
          {
            id: dbDates[0],
            allTasks: 0,
            doneTasks:0
          },
          {
            id: dbDates[1],
            allTasks: 0,
            doneTasks: 0
          },
          {
            id: dbDates[2],
            allTasks: 0,
            doneTasks: 0
          },
          {
            id: dbDates[3],
            allTasks: 0,
            doneTasks: 0
          },
          {
            id: dbDates[4],
            allTasks: 0,
            doneTasks: 0
          },
          {
            id: dbDates[5],
            allTasks: 0,
            doneTasks: 0
          },
          {
            id: dbDates[6],
            allTasks: 0,
            doneTasks: 0
          }
        ]
        for(let i=0; i<=chartData.length-1; i++){
          if(chartData[i]["data"]["timestamp"]){
            var timestamp = new Date(chartData[i]["data"]["timestamp"]["seconds"]*1000)
            var date = String(timestamp.getDate()).padStart(2, '0') + "_" + String(timestamp.getMonth() + 1).padStart(2, '0');
          }
          switch(date){
              case dbDates[1]:
                if (chartData[i]['data']['isDone'] == true) chartFinalArray[1]['doneTasks'] +=1
                chartFinalArray[1]['allTasks']+=1
                break;
              case dbDates[2]:
                if (chartData[i]['data']['isDone'] == true) chartFinalArray[2]['doneTasks'] +=1
                chartFinalArray[2]['allTasks']+=1
                break;
              case dbDates[3]:
                if (chartData[i]['data']['isDone'] == true) chartFinalArray[3]['doneTasks'] +=1
                chartFinalArray[3]['allTasks']+=1
                break;
              case dbDates[4]:
                if (chartData[i]['data']['isDone'] == true) chartFinalArray[4]['doneTasks'] +=1
                chartFinalArray[4]['allTasks']+=1
                break;
              case dbDates[5]:
                if (chartData[i]['data']['isDone'] == true) chartFinalArray[5]['doneTasks'] +=1
                chartFinalArray[5]['allTasks']+=1
                break;
              case dbDates[6]:
                if (chartData[i]['data']['isDone'] == true) chartFinalArray[6]['doneTasks'] +=1
                chartFinalArray[6]['allTasks']+=1
                break;
            } setChartDataExist(true)
            
            } 


        
        const state = {
          labels: [aryDates[0], aryDates[1], aryDates[2],aryDates[3], aryDates[4], aryDates[5], "TODAY"],
          datasets: [
            {
              label: "Done tasks",
              backgroundColor: "#AC3B61",
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: [
                [0,Math.round(chartFinalArray[6]["doneTasks"]/chartFinalArray[6]["allTasks"]*100)],
                [0,Math.round(chartFinalArray[5]["doneTasks"]/chartFinalArray[5]["allTasks"]*100)],
                [0,Math.round(chartFinalArray[4]["doneTasks"]/chartFinalArray[4]["allTasks"]*100)],
                [0,Math.round(chartFinalArray[3]["doneTasks"]/chartFinalArray[3]["allTasks"]*100)],
                [0,Math.round(chartFinalArray[2]["doneTasks"]/chartFinalArray[2]["allTasks"]*100)],
                [0,Math.round(chartFinalArray[1]["doneTasks"]/chartFinalArray[1]["allTasks"]*100)],
                [0,Math.round(doneTaskPercent)]] 
            }
            
          ]
        }
      
      return state;
    } 
    

    setTimeout( () => {
      setChartDataExist(true)
    },2000)
          
    
    return (
    <div className="toDoChart__wrapper">{ user.displayName?
 <div>
        {
          chartDataExist==true 
          ?<Bar 
          data={hoverTest}
          options={{
            title:{
              display:true,
              text:'Done task in %',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />:<div className="loader">
        <div className="loader-wheel"></div>
        <div className="loader-text"></div>
      </div>
      }
      </div>
:<h1>Please refresh the page</h1>}</div>
    )
}
