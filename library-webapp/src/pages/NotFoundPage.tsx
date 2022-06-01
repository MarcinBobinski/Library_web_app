import React from "react";
import {Link} from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      Not Found Page
      <Link to={""}>HOME</Link>
    </div>
  )
}

export {NotFoundPage}