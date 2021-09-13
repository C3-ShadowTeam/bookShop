import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

function footer() {
    return (
  <div  className="footer " >

        <div className="folllowUs">
            follow Us on 
           
        <a href=""
        className="facebook">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href=""
         className="Twitter">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
         <a href=""
        className="Instagram">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
       </a>
       </div> 


  </div>
    )
}

export default footer