import React, {Component} from 'react';
import './App.css';
import {AuthContext} from "./context/AuthContext";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Header} from "./pages/Header";
import {Footer} from "./pages/Footer";
import {MainPage} from "./pages/MainPage";
import {NavBar} from "./navigation/NavBar";

function NavRoute(path: string, Test: React.Component){
  return <Route path={path} element={
    <div>
      <Header/>
      <Footer/>
    </div>
  }/>;
}


function App() {

  // Auth Context
  const [user, setUser] = React.useState<string | null>(null)
  const [token, setToken] = React.useState<string | null>(null)
  const [roles, setRoles] = React.useState<string[] | null>(null)

  return <div>
    <AuthContext.Provider value={{user, setUser, token, setToken, roles, setRoles}}>
      <Router>
        <NavBar></NavBar>
      </Router>
    </AuthContext.Provider>
  </div>
}

export default App;
