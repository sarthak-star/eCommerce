import React from "react";
import { BiSolidError } from "react-icons/bi";
import "./NotFound.css";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <BiSolidError />

      <p>Page Not Found </p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
