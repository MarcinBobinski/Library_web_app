import React from 'react';
import './App.css';
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {Header} from "./views/header/Header";
import {Footer} from "./views/footer/Footer";
import {BookListing} from "./views/book-listing/BookListing";
import {BookDetails} from "./views/book-details/BookDetails";
import {UserDetails} from "./views/user-details/UserDetails";
import {NotFound} from "./views/not-found/NotFound";
import {Login} from "./views/login/Login";
import {Register} from "./views/register/Register";
import {SearchProvider} from "./context/SearchContext";
import {MantineProvider} from "@mantine/core";

type WrapperProps = {
  children: React.ReactNode;
}

const Wrapper = ({children}: WrapperProps) => {
  return <>
    <Header/>
    {children}
    <Footer/>
  </>
}

function App() {
  return <>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <SearchProvider>
          <Router>
            <Routes>
              <Route path="" element={<Navigate to="/books"/>}/>
              <Route path="/books" element={<Wrapper><BookListing/></Wrapper>}/>
              <Route path="/book" element={<Wrapper><BookDetails/></Wrapper>}/>
              <Route path="/user" element={<Wrapper><UserDetails/></Wrapper>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </Router>
        </SearchProvider>
      </AuthProvider>
    </MantineProvider>
  </>
}

export default App;
