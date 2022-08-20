import React from "react";
import {Col, Container, Nav, Navbar, NavDropdown, NavLink, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BookSearch} from "./components/BookSearch";
import {Auth} from "./components/Auth";

export const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container className="justify-content-between">
        <Link className="navbar-brand" to={"/"}>Biblioteka</Link>
        <BookSearch/>
        <Auth/>
      </Container>
    </Navbar>
  )
}
