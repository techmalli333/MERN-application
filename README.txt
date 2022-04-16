TO START XAMMP IN UBUNTU
--------------------------
  > sudo /opt/lampp/lampp start
  > sudo /opt/lampp/manager-linux-x64.run // GUI command

  > sudo service apache2 status	// verify that the service is not already running
  > sudo service apache2 stop	// to stop

  > http://localhost/phpmyadmin/ 	// DATABASE url



PROJECT FEATURES
-----------------
  > REGISTRATION
  > LOGIN 
  > VIEW PROFILE
  > EDIT PROFILE
  > DELETE PROFILE
  > CHANGE PASSWORD
  > FORGET PASSWORD
  > RESET PASSWORD
  > LOGOUT
  > ROLE MANAGEMENT, JWT AUTHENTICATION AND EMAIL SERVICE
  > CORS, CSRF ATTACK PREVENTION, SQL INJECTION PREVENTION

  

PROJECT SETUP BACKEND
----------------------
  > server :- MySQL
  > create a new nodeJS project 
    > npm init -y
    > sudo npm i nodemon -g
    > npm i express cors ejs dotenv morgan mysql bcrypt jsonwebtoken mongoose


  > create an express server
    > create server.js
    > in package.json add "main": "server.js"
      > scripts {
          "start": "nodemon server.js"
        }


  > database setup and connect to nodeJS
    > create .env file
    > instll Thunder Client extension. it helps to run http requests in VScode
    
    > create one database(mern-stack-database) in xampp app
      > create the tables
        > 1. users - id, name, emial, password, profilepic, role, verifed, refreshtoken, expiretoken, createdat, updatedat
        > 2. blacklist - id, token, emial, createdat, updatedat
        > 3. courses - id, coursename, description, technologies, createdat, updatedat


  > create REST APIs and authentication with JWT
    > MVC Structure
      > MVC (Model-View-Controller) is a pattern in software design commonly used to implement user interfaces, data, and controlling logic.
      > Controllers
      > Models
      > Views
      > Routes
        > User CURD Operations:
          > /signup (POST)
          > /getUser/:id (GET)
          > /editUser/:id (PUT)
          > /deleteUser/:id (PUT)

        > Authentication Flow:
          > /verify/:token (POST)
          > /signin (POST)
          > /changepassword (PUT)
          > /forgetpassword (POST)
          > /resetpassword (PUT)
          > /logout (POST)

    >

  > setup emial service and emial templates



PROJECT SETUP FRONTEND
----------------------
  > create a react app using create react app:  
    > npm i create-react-app
    > npx create-react-app frontend

  > setup bootstrap, font awesome, simple react validator, react router dom, redux
    > npm i 
      bootstrap@5.0.2 
      font-awesome@4.7.0 
      simple-react-validator@1.6.0 
      react-router-dom@5.2.0 
      redux react-redux redux-thunk 
      axios
      react-notifications
      react-loader-spinner


  > Bootstrap and common functionality
    > Import bootstrap and font-awesome
    > Create a common utility for validation
    > Ceate a common utility for API calls with Redux 
    > Authentication
      > isAuthenticated
      > getAuthTOken
      > clearLocalStorage

  > ROUTING
    > create public route and private route components 
    > add routing for Home Page, Sign Up, Sign In, Forget Password, Rest Password, Change Password, Dashboard, 404 Not Found.
    > / - Home
    > /signup - Sign Up
    > /signin - Sign IN
    > /forgetpassword - Forget Password
    > /resetpassword/:token - Rest Password
    > /changepassword - Change Password 
    > /dashboard - Dashboard
    > * - 404 Not Found

  > REGISTRATION
    > Component Name - Register
    > Required Fields:
      > Username
      > Password
      > Confirm Password
    > Validation:
      > Valid Email and Password
      > Password and Confirm Password should be matched.
    > API: (POST Method)
    > /signup
    > Request Body:
      > {username:"lee@gmail.com", password:"lee@123"}
      > On Successful sign up Redirect to /signin




























