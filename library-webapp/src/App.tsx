import React from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {BookListing} from "./views/book-listing/BookListing";
import {BookDetails} from "./views/book-details/BookDetails";
import {UserDetails} from "./views/user-details/UserDetails";
import {NotFound} from "./views/not-found/NotFound";
import {Login} from "./views/login/Login";
import {Register} from "./views/register/Register";

function App() {
  return (
        <Router>
          <Routes>
            <Route path="" element={<Navigate to="/books"/>}/>
            <Route path="/books" element={<BookListing/>}/>
            <Route path="/book" element={<BookDetails/>}/>
            <Route path="/user" element={<UserDetails/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Router>
    )
}

export default App;
