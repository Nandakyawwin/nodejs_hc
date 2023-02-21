require('dotenv').config();
let express = require('express'),
    app = express(),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    Admin = require('./database/admin'),
    Movie = require('./database/movie'),
    User = require('./database/user'),
    cors = require('cors');
// Mod = require('./database/mod');

let jwtOption = {};
jwtOption.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOption.secretOrKey = process.env.SECRET;

let myS = new JwtStrategy(jwtOption, (payload, done) => {
    let email = payload.email;
    let name = payload.name;
    Admin.findByAdminemail(email)
        .then(admin => {
            if (admin.name == name) {
                done(null, admin);
            }
        })
        .catch(err => done(err, null));
})

let userRoute = require('./route/user')(express, jwt, bodyParser);
let adminRoute = require('./route/admin')(express, jwt, passport, bodyParser);
let modRoute = require('./route/mod')(express, jwt, passport, bodyParser);
let guestRoute = require('./route/guest')(express, bodyParser);
let path = require('path');

passport.use(myS);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './imgs')));

app.use(cors());
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/mod', modRoute);
app.use('/', guestRoute);

app.listen(process.env.PORT, _ => {
    console.log(`Server is running at ${process.env.PORT}`);
});