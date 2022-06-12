import React from "react";
import {Link} from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <div>
      Not Found Page
      <Link to={"/"}>HOME</Link>
    </div>
  )
}
