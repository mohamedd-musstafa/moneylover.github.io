import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import "../../assets/styles/style.css"
import depositIcon from "../../assets/images/deposit.png";
import eyeIcon from "../../assets/images/eye.png";
import "./styleLogin.css";

export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className="wrapper">
      <div className="top-background">
        <img src={depositIcon} className="deposit-icon"></img>
        <div className="header-name">Money Lover</div>
      </div>

      <div className="form-login">
        <div className="login-text">
          <p>Log In</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="email"
              type="email"
              placeholder="Email"
              name="email"
            />{" "}
            {errors.email && (
              <p className="errorsMessage">{errors.email.message}</p>
            )}
          </div>
          <div className="password-login">
            <input
              ref={register({
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
              className="password"
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              name="password"
            />{" "}
            {errors.password && (
              <p className="errorsMessage">{errors.password.message}</p>
            )}
            <img
              onClick={togglePasswordVisibility}
              className="eyeLogin"
              src={eyeIcon}
            ></img>
          </div>

          <button
            type="submit"
            className="btn-login"
            onClick={handleSubmit(onSubmit)}
          >
            <span className="btn-text">LOGIN</span>
          </button>
        </form>

        <div className="footer">
          <small>Don’t have an account?</small>
          <a className="register">
            <Link to="/Register">Register</Link>
          </a>
        </div>
      </div>
    </div>
  );
}
