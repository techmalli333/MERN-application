import React, { useState } from "react";
import { Validator } from "../utilities/validation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { forgetPassword } from "../redux/actions/AuthAct";
import { LoaderContainer } from "../utilities/loader";

function ForgetPassword({ forgetPassword }) {
  const [username, setusername] = useState("");
  const [, forceUpdate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  let validator = Validator();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      setLoading(true);
      let user = { email: username };
      forgetPassword(user)
        .then((response) => {
          setLoading(false);
          setTimeout(() => {
            window.location.href = "/signin";
          }, 1000);
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
        <i className="fa fa-envelope text-warning" style={{ fontSize: 200 }} />
        <h1>Forget Password</h1>

        <form className="m-3" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your Email"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          {validator.current.message("Email", username, "required")}
          <br />
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
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      forgetPassword,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ForgetPassword);
