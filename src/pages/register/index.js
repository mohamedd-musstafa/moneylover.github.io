import React, { useState, useEffect } from "react";
import { Component } from "react";
import "./style.css";
import depositIcon from "../../assets/images/deposit.png";
import eyeIcon from "../../assets/images/eye.png";
import eyeSlashIcon from "../../assets/images/eyeslash.png";
// import { useState } from "react";

export default function register() {

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  }

  return (
    <div className="wrapper">
      <div className="top-background">
        <img src={depositIcon} className="deposit-icon"></img>
        <div className="header-name">Money Lover</div>
      </div>

      <div className="form-login">
        <div className="login-text">
          <p>Sign Up</p>
        </div>
        <form>
          <div>
            <input
              className="nickname"
              type="text"
              placeholder="Nick name"
              name="nickname"
            />
          </div>
          <div>
            <input
              className="email"
              type="email"
              placeholder="Email"
              name="email"
            />
          </div>
          <div>
            <input
              className="password"
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              name="password"
            />
            <img onClick={togglePasswordVisibility} src={eyeIcon}></img>
          </div>
          <div>
            <input
              className="confirm_password"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
            />
            <img src={eyeIcon}></img>
          </div>

          <button type="submit" className="btn-register">
            <span className="btn-text">SIGN UP</span>
          </button>
        </form>

        <div className="footer">
          <small>All ready have an account?</small>
          <a className="register">Sign in</a>
        </div>
      </div>
    </div>
  );
}

// export default register;
