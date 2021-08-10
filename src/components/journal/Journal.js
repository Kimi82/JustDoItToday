import React, {useState} from 'react'
import './Journal.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from '../../firebase.js'
import firebase from "firebase"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function Journal({user}) {

  const [noteValue, setNoteValue] = useState('');
  const [noteAlert, setNoteAlert] = useState('');
  const [open, setOpen] = useState(false);
  const [mood, setMood] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleMood = e => {
    setMood(e.target.value)
  };
  const addNote = (e) => {  //function to add note 
    const today = new Date()
    const todayDate = String(today.getDate()).padStart(2, '0') + "_" + String(today.getMonth() + 1).padStart(2, '0');
    e.preventDefault();
    db.collection(user.displayName).doc("notes").collection(todayDate).add({
        text: noteValue,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        mood: mood
    })
    setNoteValue('');
}

  async function getNote(date){
  const dbDate = String(date.getDate()).padStart(2, '0') + "_" + String(date.getMonth() + 1).padStart(2, '0'); 
    const task = db.collection(user.displayName).doc("notes").collection(dbDate); 
    let taskData = await task.get()
 
    if(typeof taskData.docs[0] == 'object'){
    let taskText = taskData.docs[0].data().text
    let taskMood = taskData.docs[0].data().mood
    setNoteAlert(taskText +" Your mood: " + taskMood)
    setOpen(true)
    }
}

if(mood.length===0){
  var inputButtonClass = "journal__inputButtonDisable"
  var inputButtonText = "FIRST, PICK YOUR MOOD"
}else{
  var inputButtonClass = "journal__inputButton"
  var inputButtonText = "ADD NOTE"
}

    return (
    <div className="journal__wrapper">
        
  <div className="journal__inputBox">
  
	  <textarea className="journal__input" type="text" placeholder="Describe your today mood" value={noteValue} onChange={e => setNoteValue(e.target.value)}/>
    <div className="journal__inputButtonWrapper">
    <button className="journal__inputButtonGood" value={'🙂'} onClick={handleMood}>🙂</button>
    <button className="journal__inputButtonNormal" value={'😐'} onClick={handleMood}>😐</button>
    <button className="journal__inputButtonBad" value={'🙁'} onClick={handleMood}>🙁</button>
    </div>
    
    
    <button className={inputButtonClass} onClick={addNote}><b>{inputButtonText}</b></button>
    
    </div>
        <div className="journal__chart">
          {
    
  <>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Note: "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {noteAlert}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
        <Calendar
          value={new Date()}
          onChange={(value) => getNote(value)}
        />

    </>
  }

        </div>

    </div>
    )


} 