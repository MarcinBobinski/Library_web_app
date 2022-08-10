import React from "react";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export const Auth: React.FC = () => {
  return (
    <Row className="align-items-center">
      <Col className="align-self-center" md="auto">
        <Link className="btn btn-outline-primary my-2" to="/login">Login</Link>
      </Col>
      <Col md="auto" className="align-self-center">
        <Link className="btn btn-outline-primary my-2" to="/register">Register</Link>
      </Col>
    </Row>
  )
}