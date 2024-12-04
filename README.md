users api

Routes Operation

- / Home page (a simple html title)
- GET /users List of users in html
- GET /api/users List of users as JSON

10/02/2024 - Lesson 26 Nov

1. eslint and prettier set up
2. cors policy. Reason why we can't share data between domains
   Use header access-control-allow-origin
3. express-status-monitor
4. streaming
   Done
   17/02/2024 - Lesson Dec 02, 2023
   Sending a large file from the server to browser usign createStream
   Note the response headers connection : Keep-Alive and Transfer-Encoding : Chunked when the data is streamed.
   use fs.createReadStream
   Database -
   Different types
   Sql and NoSql
   We start MongoDB tomorrow
   Done

19/02/2024 - Lesson Dec 03, 2023
Mongo db atlas account
User kirankk105 password - Manjisha123
Mongo connect - mongodb+srv://kirankk105:<Manjisha123>@codelightcluster.edr60bq.mongodb.net/?retryWrites=true&w=majority
24/02/24
install Mongoose to connect MongoDB from the node app
Make sure that the db username and password are in .env file
Setup db connection in a separate file. The top level index.js file should only have

1. config env
2. db connection setup call
3. app.listen
   To fix - Why is mongo db accepting duplicate entries?

04/03/2024 - Dec 09-2023 session
Note that the model inside models folder User has U uppercase becuse it is a db model or class

25/03/2024 - Dec 09-2023 session again
Can't remember where exactly I stopped so doing the session again :(
26/03/2024 - Dec 09/2023 session
Fixed the email unique issue. Just removed the old collection from mongodb and created a new one.
CRUD operation MongoDB
We changed all the user controller funtions to use the DB
We learned about find, findOne, findAndDelete etc
We learned about filters in the find and findOne using json filters
Done

27/03/2024 - Dec 10
We are going to create an application with FE and use the filters API
Add filters with subtring in query params - Filter API is ready now
Template Engine - Used to render html at server side
We will be using EJS
Steps -
Tell express we are using EJS
Create the ejs file and use the render method to pass the data model to the ejs file.
Create the filter method inside the home controller which was sending the html.
We will be doing the rendering here only.
Use the ejs syntax for dynamic content
Note that we are the properties of the data model that we set in the controller directly in the ejs file
Done

01/04/2024- Dec 16
Authentication
Authorisation
MVC
Build a project to learn session token
Create a mean stack app with session cookie and use encryption
How to correctly import dotenv so that you can use it in the files like app.js - import 'dotenv/config.js'

Insall bycrypt and express session. set up express session inside app.js. This is for session management in express

Created the signup, signin and dashboard ejs files
Created the user in the signup flow for Mongodb
Updated the setuser api to use hashed password

04/04/2024 - Dec 17
Login is working as expected from the browser
Sign up also
Handled the dashboard page based on user session availability
logout set up
Using express session is stateful
JWT is the way to achieve a stateless server. Server doesn't save any state of the user

15/06/2024 - Dec 23
Removed express session. Now all the operations are using JWT

18/06/2024 - Dec 24
What is single sign on
Learn high level how sso works.
