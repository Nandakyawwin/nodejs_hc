module.exports = (express) => {
    let router = express.Router();
    let bcrypt = require('../helper/pass');
    let Movie = require('../database/movie');
    let Job = require('../database/job');
    let User = require('../database/user');
    let Comment = require('../database/comment');
    let Ads = require('../database/ads');

    // Guest register to user 

    router.post('/register', (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let name = req.body.name;
        User.checkEmail(email)
            .then(result => {
                {
                    bcrypt.encrypt(password)
                        .then(result => {
                            let user = {
                                'email': email,
                                'name': name,
                                'password': result
                            };
                            User.save_user(user)
                                .then(usera => res.send({ con: true, msg: usera }))
                                .catch(err => res.send({ con: false, msg: err }));

                        })
                        .catch(err => res.send({ con: false, msg: err }));
                }
            })
            .catch(err => res.send({ con: false, msg: err }));

    });

    // Guest login to user


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
                            res.json({ con: false, msg: 'password wrong' });
                        }
                    }).catch(err => res.json({ con: false, msg: err }));
            })
            .catch(err => res.json({ con: false, msg: 'something went wrong!!' }));
    });

    // Guest get all Movies

    router.get('/movies', (req, res) => {
        Movie.all_Movies()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    // Guest all movie paginate

    router.get('/movie/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Movie.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    });

    //Guest all jobs

    router.get('/jobs', (req, res) => {
        Job.all_Job()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    // Guest all job paginate

    router.get('/job/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Job.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    });

    // Guest all ads 

    router.get('/ads', (req, res) => {
        Ads.all_ads()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    // Guest all comments 

    router.get('/comments', (req, res) => {
        Comment.all_comments()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    // Guest search movie 

    router.post('/searchMovie', (req, res) => {
        let searchM = req.body.name;
        Movie.findMovie(searchM)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })
    return router;

}







