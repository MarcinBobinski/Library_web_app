import {Link} from "react-router-dom";
import React from "react";

function NavBar() {
  return (
    <>
      <Link to={"/main"}>Main</Link>
      <Link to={"/books"}>Books</Link>
      <Link to={"/book"}>Book</Link>
      <Link to={"/user"}>User</Link>
    </>
  )
}

export {NavBar}