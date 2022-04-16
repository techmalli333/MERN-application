export const authAPI = {
  signupUser: {
    method: "post",
    url: "/signup",
  },
  signinUser: {
    method: "post",
    url: "/signin",
  },
  isAuthenticated: {
    method: "get",
    url: "/isAuthenticated",
  },
  getUser: (email) => ({
    method: "get",
    url: "/getUser/" + email,
  }),
  forgetPassword: {
    method: "post",
    url: "/forgetpassword",
  },
  resetPassword: {
    method: "put",
    url: "/resetpassword",
  },
  changePassword: {
    method: "put",
    url: "/changepassword",
  },
  updateProfile: {
    method: "put",
    url: "/editUser",
  },
  logoutUser: {
    method: "post",
    url: "/logout",
  },
};
