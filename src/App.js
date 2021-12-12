import './css/App.css';
import Dashboard from './js/Dashboard';
import React, { useState, useEffect } from "react";
import Home from './js/Home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  

  //gets "currentUser" data stored in local storage if there is any and saves it to currentUser state
  const localStorageCurrentUser = localStorage.getItem("currentUser")
  let currentUserData = {}
  if(localStorageCurrentUser) {
    currentUserData = JSON.parse(localStorageCurrentUser)
  }
  const [currentUser, setCurrentUser] = useState(currentUserData)

  //saves changes to localstorage.currentUser whenever there are change to currentUser state
  useEffect(()=>{
    localStorage.setItem("currentUser",JSON.stringify(currentUser))
  },[currentUser])


  return (
    <Router>
    <div className='h-full w-full'>

      <Switch>
        <Route exact path="/" component={() => <Home 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        />}>
        </Route>
        <Route path="/dashboard" component={() => <Dashboard 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        />}>
        </Route>
      </Switch>
    </div>
  </Router>
  );
}


export default App;
