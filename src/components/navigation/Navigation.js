import React, {useState ,useEffect} from 'react';
import './Navigation.css'
import { db, auth } from '../../firebase.js' 
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


function Navigation () {

   const classes = useStyles();
   const [modalStyle] = useState(getModalStyle);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [user, setUser] = useState(null)
   const [open, setOpen] = useState(false);
   const [openSignIn, setOpenSignIn] = useState('')
   const [username, setUsername] = useState('');


    useEffect(() =>{
      const unsubscribe = auth.onAuthStateChanged((authUser)=>{
        if (authUser){
          setUser(authUser);
      }
      })
      return () =>{
        unsubscribe();
      }
    }, [user, username])

    const signUp = (e) =>{
      e.preventDefault();
      auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        window.location.reload();
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
      setOpen(false)
    }
  
    const signIn = (e) => {
      

      auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
      setOpenSignIn(false)
    }
    


   return (
    
   <header className="navigation__header">
      <img
        className="navigation__headerImage"
        src="https://www.wykop.pl/cdn/c3201142/comment_jW2jz41f8eKiYgz7Lj78np48cwpD9oH7,w1200h627f.jpg"
        alt="logo">
      </img>
      <h1>{user?.displayName}<br/>
       time
       </h1>
      {user?.displayName ? <Button onClick={() =>{
         auth.signOut();
         window.location.reload(false)}}>Logout</Button> 
        : 
        <div className="navigation__loginWrapper">
        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={() => setOpen(true)}>Sign UP</Button>
        </div>
        }

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

)


}
export default Navigation