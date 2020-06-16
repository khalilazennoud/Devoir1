import React from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import './App.css';
import Upload from "./Upload";
import Signin from "./Signin";
import Signup from "./Signup";


function App() {
  return (
    <AuthProvider>
    <HashRouter>
    <div className="App">
    
          <ul className="header">
            <li><a href="/">Home</a></li>
            <li><a href="/stuff">Stuff</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/Signin" id="blo"><NavLink to ="/Signin">SIGN IN</NavLink></a></li>
          </ul>
          <div className="content">
          
            <Route path="/Signin" component={Signin}/>
            <Route path="/Signup" component={Signup}/>
            <PrivateRoute path="/Upload" component={Upload}/>
          </div>
    </div>
    </HashRouter>
    </AuthProvider>
  );
}

export default App;
