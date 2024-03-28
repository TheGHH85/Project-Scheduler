# Project-Scheduler

A mock dog boarding scheduler CRUD application that uses the MERN stack using  RESTful API calls and user authentication and verification.

## Features

- Login as a user
- Register new users
- Modify user profiles
- Add/Update/Delete Clients
- View all clients
- Add Classes to Schedule
- Add/remove clients to classes
  

## Usage
- Register a new user using the 'Register' button (for simplicity i added it to the login page but this will be accessable to admins while they are logged in)
- NOTE When registering, please set yourself to ADMIN so you get the full expereince, as TRAINER makes certain pages unaccessable
- Login using the registered info
- Click 'Add Client' and fillout the form
- Click Client List to view the clients
- Once in you can update or delete the client, refresh the page to see the changes
- Click "Users" to modify the users listed
- Click "Schedule View" and choose a date
- Click "Add Class" and fill out the modal form, once completed refresh the page
- Click "Add Client" to add a client, once added please refresh the page again to see the addition
- To delete a client, just click on their name and refresh the page

## About Scheduling
The stakeholder has provided specific instructions as to how the scheduling needs to work. When you add a class on a date, that class is then added to the same day of the week, each week, for the next 7 weeks, as these classes are 8 week courses. The stakeholder also requested that a client needs to be able to be removable sometime between the start date and the end date of the class. If the are removed before the end date, then all future classes have that client removed, while all previous classes have that client remain to record purposes.
Also, when you add a class thats type "Other" a descriptions files is added to the modal and the class listed on the webpage at the request of the stakeholder. 

## Depedencies

- React
- Node.js
- Express.js
- bodyParser
- MongoDB | Mongoose
- Passport.js | passport-local - Authentication
- bcrypt - Authentication
- cors
- react-calender
- date-fns
- web-vitals
- moment
- axios
- postcss/tailwindcss

## Authentication
Authentication operates by having the webpage verify the presence of credentials in the browser. If credentials are found, it searches through the users' collection in MongoDB for a matching entry. If a match is found, the user is granted access; otherwise, they are redirected back to the login screen. Each webpage (or route) is enclosed within a route component, ensuring that any routes contained within this tag are subjected to authentication checks. Only unauthenticated users can access the Login and Register pages. You can test this by signing out and appending '/MainPage' to the URL, where you will find that you are redirected back to the Login page.

