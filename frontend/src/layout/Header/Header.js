import React, { useState } from 'react';
import './header.css'; // You can adjust the path to your CSS file
import { HiMenuAlt2 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/Opulence_Avenue_logo.png"
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);

  const openNav = () => {
    setOverlayOpen(true);
  };

  const closeNav = () => {
    setOverlayOpen(false);
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    openNav();
  };

  return (
    <div className="header">
      <div id="myNav" className={`overlay ${overlayOpen ? 'open' : ''}`}>
        <span  className="closebtn" onClick={closeNav}>
          <AiOutlineClose fontSize={50} color='#69443C'/>
        </span>
        <div className="overlay-content">
          <img src={logo} width={300}/>
          <a href="/login"><FaRegUser /></a>
          <a href="#">About</a>
          <a href="/products">Products</a>
          <a href="/">Home</a>
          <a href="#">Contact</a>
        </div>
      </div>

      
      <span className='burger_icon'  style={{ fontSize: '30px', cursor: 'pointer' }} onClick={handleNavClick}>
        <HiMenuAlt2 fontSize={40} color='#69443C' />
      </span>
    </div>
  );
};

export default Header;
