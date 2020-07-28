import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation.js'
import ToDoList from './components/todo_list/ToDoList';
function App() {

  return (
    <div className="App">
      <Navigation/>
      <ToDoList/>
    </div>
  );

}

export default App;
