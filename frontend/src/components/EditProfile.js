import React, { useState, useEffect } from "react";
import { Validator } from "../utilities/validation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUser, updateProfile } from "../redux/actions/AuthAct";
import { LoaderContainer } from "../utilities/loader";
import { getLocalStorage, saveLocalStorage } from "../utilities/authorization";

function EditProfile({ getUser, updateProfile }) {
  const [fullname, setfullname] = useState("");
  const [username, setusername] = useState("");
  const [isLoading, setLoading] = useState(false);
  let validator = Validator();
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = () => {
    setLoading(true);
    getUser()
      .then((response) => {
        setLoading(false);
        console.log(response);
        setfullname(response.data[0].name);
        setusername(response.data[0].email);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let email = getLocalStorage("email");
    let user = { email, name: fullname };
    updateProfile(user)
      .then((response) => {
        setLoading(false);
        console.log(response);
        saveLocalStorage("username", fullname);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-center text-center m-4">
      <div className="text-center bg-dark col-lg-6 col-md-12 col-sm-12 col-xs-12 rounded text-white">
        <i className="fa fa-user text-warning" style={{ fontSize: 200 }} />
        <h1>Edit Profile</h1>

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
            disabled
            type="text"
            className="form-control"
            placeholder="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          {validator.current.message("Username", username, "required|email")}
          <br />

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
      getUser,
      updateProfile,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(EditProfile);
