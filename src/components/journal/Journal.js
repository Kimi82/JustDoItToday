import React, {useState} from 'react'
import './Journal.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from '../../firebase.js'
import firebase from "firebase"
import { getNodeText } from '@testing-library/react';


export default function Journal({user}) {

  const [noteValue, setNoteValue] = useState('');

  const addNote = (e) => {  //function to add note 
    const today = new Date()
    const todayDate = String(today.getDate()).padStart(2, '0') + "_" + String(today.getMonth() + 1).padStart(2, '0');
    e.preventDefault();
    db.collection(user.displayName).doc("notes").collection(todayDate).add({
        text: noteValue,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setNoteValue('');
}

  async function getNote(date){
  const dbDate = String(date.getDate()).padStart(2, '0') + "_" + String(date.getMonth() + 1).padStart(2, '0'); 
    const task = db.collection(user.displayName).doc("notes").collection(dbDate); 
    let taskData = await task.get()
    taskData = taskData.docs[0].data().text
    console.log(taskData)
    console.log("first?")    
}



    return (
    <div className="journal__wrapper">
        
  <div className="journal__inputBox">
  
	  <textarea className="journal__input" type="text" placeholder="My day was so productive..." value={noteValue} onChange={e => setNoteValue(e.target.value)}/>
    <button className="journal__inputButton" onClick={addNote}><b>ADD NOTE</b></button>
  </div>
        <div className="journal__chart">
          {
    
      <div>
        <Calendar
          value={new Date()}
          onChange={(value, event) => getNote(value)}
        />
      </div>
    
  }

        </div>

    </div>
    )


} 