import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Validator } from "../utilities/validation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { signin } from "../redux/actions/AuthAct";
import { saveLocalStorage } from "../utilities/authorization";
import { LoaderContainer } from "../utilities/loader";

function Login({ signin }) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [, forceUpdate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  let validator = Validator();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      setLoading(true);
      let user = { email: username, password };
      signin(user)
        .then((response) => {
          setLoading(false);
          console.log(response);
          saveLocalStorage("email", username);
          saveLocalStorage("token", response.token);
          setLoggedIn(true);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } else {
      validator.current.showMessages();
      forceUpdate(true);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center text-center m-4">
      <div className="text-center bg-dark col-lg-6 col-md-12 col-sm-12 col-xs-12 rounded text-white">
        <i className="fa fa-user text-warning" style={{ fontSize: 200 }} />
        <h1>Login</h1>

        <form className="m-3" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          {validator.current.message("Username", username, "required|email")}
          <br />
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          {validator.current.message("Password", password, "required|password")}
          <br />
          <br />
          {!isLoading ? (
            <input
              type="submit"
              value="Login"
              className="btn btn-primary w-50"
            />
          ) : (
            <LoaderContainer />
          )}
          <br />
          <br />
          <Link to="/forgetpassword">
            <input
              type="submit"
              value="Forget Password"
              className="btn btn-outline-danger w-50"
            />
          </Link>
          <br />
          <br />
          <span>Don't Have an Account?</span> &nbsp;&nbsp;
          <Link to="/signup">
            <button className="btn btn-outline-info">Register</button>
          </Link>
        </form>
      </div>
      {isLoggedIn && <Redirect to="/dashboard" />}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signin,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Login);
