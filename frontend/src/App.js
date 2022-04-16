import { Switch, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import PublicRoute from "./components/common/PublicRoute";
import Homepage from "./components/Homepage";
import Footer from "./components/common/Footer";
import { NotificationContainer } from "react-notifications";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import ChangePassword from "./components/ChangePassword";
import ViewProfile from "./components/ViewProfile";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: 700 }}>
        <Switch>
          <Redirect from="/login" to="/signin" />
          <PublicRoute path="/" component={Homepage} exact />
          <PublicRoute path="/signup" component={Register} exact />
          <PublicRoute path="/signin" component={Login} exact />
          <PublicRoute
            path="/forgetpassword"
            component={ForgetPassword}
            exact
          />
          <PublicRoute
            path="/resetPassword/:token"
            component={ResetPassword}
            exact
          />
          <PrivateRoute path="/dashboard" component={Dashboard} exact />
          <PrivateRoute
            path="/changepassword"
            component={ChangePassword}
            exact
          />
          <PrivateRoute path="/viewprofile" component={ViewProfile} exact />
          <PrivateRoute path="/editprofile" component={EditProfile} exact />
          <PublicRoute path="*">
            <h1 className="text-center">404 Not Found!</h1>
          </PublicRoute>
        </Switch>
      </div>
      <NotificationContainer />
      <Footer />
    </div>
  );
}

export default App;
