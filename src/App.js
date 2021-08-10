import './App.css';
import './components/todo_list/ToDoList.css';
import './Navigation.css';
import ToDoList from './components/todo_list/ToDoList';
import ToDoChart from './components/todo_chart/ToDoChart';
import Journal from './components/journal/Journal';
import React, {useState ,useEffect, useRef} from 'react';
import { db, auth } from './firebase.js' 
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core'


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const  useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState('')
  const [username, setUsername] = useState('');

 

  const today = new Date()
  const todayDate = String(today.getDate()).padStart(2, '0') + "_" + String(today.getMonth() + 1).padStart(2, '0');  

  useEffect(() => {
  
    (async function checkLogin() {
      await auth.onAuthStateChanged((authUser)=>{ 
        setUser( authUser);})
    })();
  }, [user, username]);

  

  const signUp = async (e) =>{
    e.preventDefault();
    try{
    await auth.createUserWithEmailAndPassword(email, password)
    setOpen(false)
    window.location.reload();
    return await auth.currentUser.updateProfile({
      displayName: username
    
    })
    
     }
    catch(error){
      alert(error.message)
    }
    

  }
  
  const signIn = (e) => {
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
    setOpenSignIn(false)
  }




 return (
  <div className="app">

 <header className="navigation__header">
   
    <h1>Hi, {user?.displayName}<br/> Have a great day!</h1>
    <div>
    
    {user?.displayName ? 
    <Button onClick={() =>{
       auth.signOut();
       window.location.reload(false)}}>Logout</Button>
       : 
      <div className="navigation__loginWrapper">
        
      <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
      <Button onClick={() => setOpen(true)}>Sign UP</Button>
      </div>
      }
      
      
  </div>
  <Modal
    open={open}
    onClose={() => setOpen(false)}>
    <form>
    <div style={modalStyle} className={classes.paper}>
    <Input 
      placeholder="username"
      type="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />
    <Input 
      placeholder="email"
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <Input 
      placeholder="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)} 
    />
    <Button type='submit' onClick={signUp}>Sign Up</Button>
    </div>
  </form>
  </Modal> 

  <Modal
    open={openSignIn}
    onClose={() => setOpenSignIn(false)}>
    <form className="app__signup">
    <div style={modalStyle} className={classes.paper}>

    <Input 
      placeholder="email"
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <Input 
      placeholder="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)} 
    />
    <Button type='submit' onClick={signIn}>Sign In</Button>
    </div>
  </form>
  </Modal> 

  
      
 </header>

 <div className="app__toDo">
 {user ?
  <ToDoChart user={user}/>
  :<h1>You need to login, to use the website</h1>}
 { user ?
 <ToDoList user={user}/>
 :<h1>: )</h1>} 

 </div>
 <Journal user={user}/>
 </div>
)


}
  



export default App;