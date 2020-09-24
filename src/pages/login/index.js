import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import depositIcon from "../../assets/images/deposit.png";
import eyeIcon from "../../assets/images/eye.png";
import eyeSlashIcon from "../../assets/images/eyeslash.png";
import "./styleLogin.css";

export default function Login() {
  // const { userData, setUserData } = useState({
  //   firstName: "",
  //   lastName: "",
  //   id: "",
  //   email: "",
  //   balance: "",
  //   createdAt: "",
  //   updatedAt: "",
  // });
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [errorsMessage, setErrorMessage] = useState([]);
  // const firstName = localStorage.getItem("firstName");
  // const lastName = localStorage.getItem("lastName");
  // const id = localStorage.getItem("id");
  // const email = localStorage.getItem("email");
  // const balance = localStorage.getItem("balance");
  // const createdAt = localStorage.getItem("createdAt");
  // const updatedAt = localStorage.getItem("updatedAt");
  // const token = localStorage.getItem("token");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown === true);
  };
  const onSubmitLogin = (data) => {
    // register(data);
    axios
      .post("https://msi.center/2359/auth/v1.0/login", data)
      .then(function (response) {
        if (response.status === 200) {
          console.log("success ", response);
          // handle success here
          localStorage.setItem("token", response.data.token.accessToken);
          // console.log(token);
          localStorage.setItem(
            "firstName",
            response.data.user.firstName,
            "lastName",
            response.data.user.lastName,
            "id",
            response.data.user.id,
            "email",
            response.data.user.email,
            "balance",
            response.data.user.balance,
            "createdAt",
            response.data.user.createdAt,
            "updatedAt",
            response.data.user.updatedAt
          );
          // if (typeof localStorage.getItem("token") === "undefined") {
          //   console.log("Token does not exist");
          // } else {
          //   console.log("The user has successfully logged in");
          // }
          history.push("/MainTransaction");
        }
      })
      .catch(function (error) {
        if (error.response) {
          setErrorMessage(
            Array.isArray(error.response.data.message)
              ? error.response.data.message
              : [error.response.data.message]
          );
        }
      });
  };
  return (
    <div className="wrapper">
      <div className="top-background">
        <img alt="depositIcon" src={depositIcon} className="deposit-icon"></img>
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
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
                  message:
                    "Should contain at least one digit, one lower case, one upper case, one special character, at least 8 characters",
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
              alt="eyeIcon"
              onClick={togglePasswordVisibility}
              className="eyeLogin"
              src={passwordShown ? eyeSlashIcon : eyeIcon}
            ></img>
          </div>
          <button
            type="submit"
            className="btn-login"
            onClick={handleSubmit(onSubmitLogin)}
          >
            <span className="btn-text">LOGIN</span>
          </button>
        </form>
        {<p className="responseMessage">{errorsMessage}</p>}
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
