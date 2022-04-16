import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUser } from "../redux/actions/AuthAct";
import { LoaderContainer } from "../utilities/loader";
import { logout } from "../utilities/authorization";

function ViewProfile({ getUser }) {
  const [fullname, setfullname] = useState("");
  const [username, setusername] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    handleSubmit();
  }, []);
  const handleSubmit = () => {
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
  return (
    <div className="d-flex justify-content-center align-items-center text-center m-4">
      <div className="text-center bg-dark col-lg-6 col-md-12 col-sm-12 col-xs-12 rounded text-white">
        <i className="fa fa-user text-warning" style={{ fontSize: 200 }} />
        <h1>View Profile</h1>
        {isLoading ? (
          <LoaderContainer />
        ) : (
          <div>
            <p>Full Name: {fullname}</p>
            <p>Email Address: {username}</p>
            <br />
            <button className="btn btn-outline-danger" onClick={() => logout()}>
              Logout
            </button>
          </div>
        )}
        <br />
        <br />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUser,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ViewProfile);
