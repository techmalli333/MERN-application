import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  getLocalStorage,
  saveLocalStorage,
  logout,
} from "../../utilities/authorization";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../redux/actions/AuthAct";

function Navbar({ getUser, logoutUser }) {
  const [isLoggedIn, setLoggedIn] = useState(
    getLocalStorage("token") != null ? true : false
  );
  const [username, setUsername] = useState(
    getLocalStorage("username") != null ? true : false
  );
  const [role, setRole] = useState(
    getLocalStorage("role") != null ? true : false
  );
  useEffect(() => {
    if (isLoggedIn) {
      getUser()
        .then((response) => {
          if (response.success) {
            console.log(response);
            saveLocalStorage("username", response.data[0].name);
            saveLocalStorage("role", response.data[0].role);
            setUsername(response.data[0].name);
            setRole(response.data[0].role);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const handleLogout = () => {
    let token = getLocalStorage("token");
    let email = getLocalStorage("email");
    let user = { token, email };
    logoutUser(user).then((response) => {
      if (response.success) {
        logout();
        setTimeout(() => {
          window.location.href = "/signin";
        }, 500);
      }
    });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/#">
            <span className=" mr-1f">
              <b className="text-danger">L</b>
              <b className="text-success">e</b>
              <b className="text-primary">e</b>
            </span>{" "}
            App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  activeClassName="text-warning"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  Link 1
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  Link 2
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  Link 3
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              {!isLoggedIn ? (
                <div>
                  <Link to="/signin">
                    <button className="btn btn-outline-primary me-2">
                      <i className="fa fa-user" /> Sign In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="btn btn-outline-success me-2">
                      <i className="fa fa-user-plus" /> Sign Up
                    </button>
                  </Link>
                </div>
              ) : (
                <span className="nav-item dropdown me-5">
                  <a
                    className="nav-link text-white dropdown-toggle"
                    href="/#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {username}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {role === "admin" && (
                      <li>
                        <NavLink
                          className="dropdown-item"
                          activeClassName="bg-primary text-white"
                          to="/createuser"
                        >
                          Create User
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <NavLink
                        className="dropdown-item"
                        activeClassName="bg-primary text-white"
                        to="/dashboard"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        activeClassName="bg-primary text-white"
                        to="/viewprofile"
                      >
                        View Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        activeClassName="bg-primary text-white"
                        to="/editprofile"
                      >
                        Edit Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        activeClassName="bg-primary text-white"
                        to="/changepassword"
                      >
                        Change Password
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <span
                        className="dropdown-item cursor-pointer"
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </span>
                    </li>
                  </ul>
                </span>
              )}
            </form>
          </div>
        </div>
      </nav>
      ;
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUser,
      logoutUser,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Navbar);
