// post comment

const passport = require('passport');

module.exports = (express) => {
    let router = express.Router();
    let bcrypt = require('../helper/pass');
    let Movie = require('../database/movie');
    let Job = require('../database/job');
    let User = require('../database/user');
    let Ads = require('../database/ads');
    let jwt = require('jsonwebtoken');


    // User login

    router.post('/login', (req, res) => {

        let email = req.body.email;
        let password = req.body.password;

        User.findUserbyemail(email)
            .then(userE => {
                bcrypt.compare(password, userE.password)
                    .then(result => {
                        if (result) {
                            let payload = { email: userE.email, name: userE.name };
                            let token = jwt.sign(payload, process.env.SECRET);
                            res.json({ con: true, token: token, email: userE.email, name: userE.name, role: userE.role });
                        } else {
                            res.json({ con: false, msg: 'password worng' });
                        }
                    }).catch(err => res.json({ con: false, msg: err }));
            })
            .catch(err => res.json({ con: false, msg: 'something went wrong!!' }));
    });

    // User update user data by himself

    router.get('/update', (req, res) => {
        let userObj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        User.update_user(userObj)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    // User all movies

    router.get('/movies', (req, res) => {
        Movie.all_Movies()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });


    router.get('/movie/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Movie.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    });

    router.get('/job/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Job.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    });



    router.get('/jobs', (req, res) => {
        Job.all_Job()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    router.get('/ads', (req, res) => {
        Ads.all_ads()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });


    return router;

}
