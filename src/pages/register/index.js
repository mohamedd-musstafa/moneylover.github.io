import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import depositIcon from "../../assets/images/deposit.png";
import eyeIcon from "../../assets/images/eye.png";
import eyeSlashIcon from "../../assets/images/eyeslash.png";
import "./styleRegister.css";

export default function Register() {
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };
  const { register, handleSubmit, errors, watch } = useForm();
  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [errorsMessage, setErrorMessage] = useState([]);
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmitRegister = (data) => {
    axios
      .post("https://msi.center/2359/auth/v1.0/register", data)
      .then(function (response) {
        if (response.status === 200) {
          console.log("success", response);
          // handle success here
          history.push("/Login");
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
        <img alt="Deposit Icon" src={depositIcon} className="deposit-icon" />
        <div className="header-name">Money Lover</div>
      </div>

      <div className="form-register">
        <div className="register-text">
          <p>Sign Up</p>
        </div>
        <form>
          <div>
            <input
              required
              ref={register({
                validate: (value) => value !== "",
              })}
              className="firstname"
              type="text"
              placeholder="First name"
              name="firstName"
            />
            {errors.firstName && (
              <p className="errorsMessage">Your First name is not empty!</p>
            )}
          </div>
          <div>
            <input
              ref={register({
                validate: (value) => value.length !== "",
              })}
              className="lastname"
              type="text"
              placeholder="Last name"
              name="lastName"
            />{" "}
            {errors.firstName && (
              <p className="errorsMessage">Your Last name is not empty!</p>
            )}
          </div>
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
            />
            {errors.email && (
              <p className="errorsMessage">{errors.email.message}</p>
            )}
          </div>
          <div className="password-register">
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
            )}{" "}
            <img
              alt="Eye Icon"
              onClick={togglePasswordVisibility}
              className="eyeRegister"
              src={passwordShown ? eyeSlashIcon : eyeIcon}
            />
          </div>
          <div className="passwordconfirm-register">
            <input
              className="confirm_password"
              type={confirmPasswordShown ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              ref={register({
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="errorsMessage">{errors.confirmPassword.message}</p>
            )}{" "}
            <img
              alt="Eye Icon"
              onClick={toggleConfirmPasswordVisibility}
              className="eyeslashRegister"
              src={confirmPasswordShown ? eyeSlashIcon : eyeIcon}
            />
          </div>

          <button
            type="submit"
            className="btn-register"
            onClick={handleSubmit(onSubmitRegister)}
          >
            <span className="btn-text">SIGN UP</span>
          </button>
        </form>
        {<p className="responseMessage">{errorsMessage}</p>}

        <div className="footer">
          <small>All ready have an account?</small>
          <a className="register">
            {" "}
            <Link to="/Login"> Sign in</Link>
          </a>
        </div>
      </div>
    </div>
  );
}
