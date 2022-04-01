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
    > npm i express cors ejs dotenv morgan mysql bcrypt jsonwebtoken


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































