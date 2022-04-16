import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Validator } from "../utilities/validation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { signup } from "../redux/actions/AuthAct";
import { LoaderContainer } from "../utilities/loader";

function Register({ signup }) {
  const [fullname, setfullname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [, forceUpdate] = useState(false);
  let validator = Validator();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      console.log("success");
      setLoading(true);
      let user = { name: fullname, email: username, password };
      signup(user)
        .then((response) => {
          setLoading(false);
          console.log(response);
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
        <h1>Register</h1>

        <form className="m-3" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="fullname"
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}
          />
          {validator.current.message("Full name", fullname, "required")}
          <br />
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
          <input
            type="password"
            className="form-control"
            placeholder="confirmpassword"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
          {validator.current.message(
            "Confirm Password",
            confirmpassword,
            "required|password"
          )}
          {password.length > 0 &&
          confirmpassword.length > 0 &&
          password !== confirmpassword ? (
            <span className="text-danger">Passwords must match</span>
          ) : (
            ""
          )}
          <br />
          {!isLoading ? (
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary w-50"
            />
          ) : (
            <LoaderContainer />
          )}
          <br />
          <br />
          <span>Already Have an Account?</span> &nbsp;&nbsp;
          <Link to="/signin">
            <button className="btn btn-outline-info">Login</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signup,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Register);
