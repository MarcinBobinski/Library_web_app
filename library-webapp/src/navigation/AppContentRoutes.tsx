import {Route, Routes} from "react-router-dom";
import React from "react";
import {MainPage} from "../pages/MainPage";
import {BookListingPage} from "../pages/BookListingPage";
import {BookDetailsPage} from "../pages/BookDetailsPage";
import {UserProfilePage} from "../pages/UserProfilePage";
import {NotFoundPage} from "../pages/NotFoundPage";

function AppContentRoutes() {
  return <Routes>
    <Route path="/main" element={<MainPage/>}/>
    <Route path="" element={<MainPage/>}/>
    <Route path="/books" element={<BookListingPage/>}/>
    <Route path="/book" element={<BookDetailsPage/>}/>
    <Route path="/user" element={<UserProfilePage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Routes>
}

export {AppContentRoutes}