import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import {getLocalStorage, logout} from "utilities/authorization";
import { getLocalStorage, logout } from "../../utilities/authorization";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isAuthenticated } from "../../redux/actions/AuthAct";

function PrivateRoute(props) {
  const [isLoggedIn, setLoggedIn] = useState(
    getLocalStorage("token") != null ? true : false
  );
  useEffect(() => {
    let token = getLocalStorage("token");
    if (token != null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    props.isAuthenticated().then((response) => {
      if (response.message === "Unauthorized") {
        setLoggedIn(false);
        logout();
      } else {
        setLoggedIn(true);
      }
    });
  }, []);
  return (
    <Switch>
      {isLoggedIn ? <Route {...props} /> : <Redirect to="/signin" />}
    </Switch>
  );
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      isAuthenticated,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(PrivateRoute);
