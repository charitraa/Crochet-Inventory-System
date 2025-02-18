import React from "react";
import "./Signup.css";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";


const Signup = () => {
  return (
    <div className="container">
      
      <div className="image-section">
        <img
          src="/assets/image.png" 
          alt="Twist & Crochet"
          className="image"
        />
      </div>
      
      
      <div className="form-section">
        <h2>Get Started</h2>
        <p>Sign up with</p>
        
        <div className="social-buttons">
          <button className="social-btn">
           <FaGoogle className="icon" /> Google
         </button>
            <button className="social-btn">
           <FaApple className="icon" /> Apple
          </button>
            <button className="social-btn">
           <FaFacebook className="icon" /> Facebook
          </button>
        </div>
        
        <p>OR</p>
        
        <form className="form">
          <input type="text" placeholder="Full Name" className="input" />
          <input type="text" placeholder="Username" className="input" />
          <input type="tel" placeholder="Phone Number" className="input" />
          <input type="text" placeholder="Address" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <p className="password-hint">Minimum 8 characters with at least one uppercase, one lowercase, one special character, and a number</p>
          
          <div className="checkbox-container">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">By clicking 'Log In' you agree to our website <a href="#">Terms & Conditions</a></label>
          </div>
          
          <div className="checkbox-container">
            <input type="checkbox" id="keepLogged" />
            <label htmlFor="keepLogged">Keep me logged in</label>
          </div>
          
          <button className="register-btn">REGISTER</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
