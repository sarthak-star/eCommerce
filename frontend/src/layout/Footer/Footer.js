import React from 'react';
import "./footer.css";
import Google_download_image from "../../assets/Google_download_image.png";
import logo from "../../assets/Opulence_Avenue_logo.png"
import { GrInstagram } from "react-icons/gr";
import { TbBrandYoutube } from "react-icons/tb";
import { FiFacebook } from "react-icons/fi";


const Footer = () => {
  return (
    <div className="footer">
      <div className="left_footer">
        <h3>Coming soon ...</h3>
        <img src={Google_download_image}/>
      </div>
      <div className="mid_footer">
        <img src={logo}/>
        <p>Copyrights 2023 &copy; Sarthak Bathla</p>
      </div>
      <div className="right_footer">
      <h1>Follow Us</h1>
        <a href="#"><span><GrInstagram color='#000' /></span> <span>Instagram</span></a>
        <a href="#"><span><TbBrandYoutube color='#000' /></span> <span>Youtube</span></a>
        <a href="#"><span><FiFacebook color='#000' /></span> <span>Facebook</span></a>
      </div>
    </div>
  )
}

export default Footer