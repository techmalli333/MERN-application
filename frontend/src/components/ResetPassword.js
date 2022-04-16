import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Validator } from "../utilities/validation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { resetPassword } from "../redux/actions/AuthAct";
import { LoaderContainer } from "../utilities/loader";

function ResetPassword({ resetPassword }) {
  const { token } = useParams();
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [, forceUpdate] = useState(false);
  let validator = Validator();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      setLoading(true);
      let user = { token, password };
      resetPassword(user)
        .then((response) => {
          setLoading(false);
          console.log(response);
          setTimeout(() => {
            window.location.href = "/signin";
          }, 1000);
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
        <i className="fa fa-lock text-warning" style={{ fontSize: 200 }} />
        <h1>Reset Password</h1>

        <form className="m-3" onSubmit={handleSubmit}>
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
            placeholder="confirm password"
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
              value="Update"
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
      resetPassword,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ResetPassword);
