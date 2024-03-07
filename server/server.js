const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const classRoutes = require('./controllers/scheduleControllers');
const clientController = require('./controllers/clientControllers');
const authController = require('./controllers/authController');
const passport = require('passport');

const app = express();


mongoose.connect('mongodb+srv://greyhattech2023:HQh2nMPyYYmzihWK@cluster0.yxcsk2q.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json()); // This line is crucial

app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false, // require HTTPS
        sameSite: 'lax' // the SameSite attribute
    }
}));

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./controllers/passportConfig')(passport);
app.use(clientController);


app.use('/classes', classRoutes);
app.use(authController);


app.use(express.static('public'));
app.listen(8080, () => console.log('Server started on port 8080'));