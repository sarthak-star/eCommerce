import "./App.css";
import { useEffect, useState } from "react";
import Header from "./layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./components/Search/Search.js";
import React from "react";
import Footer from "./layout/Footer/Footer.js";
import Homepage from "./components/Homepage/Homepage.js";
import Productspage from "./components/Productspage/Productspage.js";
import store from "./store.js";
import { loadUser } from "./actions/useractions.js";
import { useSelector } from "react-redux";
import axios from 'axios';
import ProtectedRoute from "./route/route.js";
import Payment from "./components/Cart/Payment.js";
import ProductDetails from "./components/ProductDetails/ProductDetails.js";
import Profile from "./components/user/Profile.js";
import LoginSignUp from "./components/user/loginsignup.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Orders/MyOrders.js";
import OrderDetails from "./components/Orders/OrderDetails.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import NotFound from "./layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {


    store.dispatch(loadUser());

    // getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />


      {/* 
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )} */}

      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Productspage />} />
        <Route path="/products/:keyword" element={<Productspage />} />

        <Route exact path="/search" element={<Search />} />


        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact path="/cart" element={<Cart />} />

        <Route exact path="/shipping" element={<Shipping />} />
        <Route exact path="/success" element={<OrderSuccess />} />
        <Route exact path="/orders" element={<MyOrders />} />
        <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        <Route exact path="/order/:id" element={<OrderDetails />} />
        <Route exact path="/account" element={<Profile />} />



        <Route
          element={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;