import React from "react";
import {Col, Row} from "react-bootstrap";
import {useSearchContext} from "../../../context/SearchContext";

export const BookSearch: React.FC = () => {
  const {searchString, setSearchString} = useSearchContext()
  return (
    <Row className="align-items-center">
      <Col className="align-self-center" md="auto">
        <input
          className="py-1"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchString}
          onChange={e => setSearchString(e.target.value)}/>
      </Col>
      <Col md="auto" className="align-self-center">
        <button className="btn btn-outline-primary my-2" type="submit">Search</button>
      </Col>
    </Row>
  )
}
