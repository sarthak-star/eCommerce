import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./orderSuccess.css";

import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <FaCheckCircle />

      <p>Your Order has been Placed successfully </p>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
