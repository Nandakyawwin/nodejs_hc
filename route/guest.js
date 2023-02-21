module.exports = (express) => {
    let router = express.Router();
    let bcrypt = require('../helper/pass');
    let Movie = require('../database/movie');
    let Job = require('../database/job');
    let User = require('../database/user');
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

    // Guest get Main Movies

    router.get('/mainMovies', (req, res) => {
        Movie.mainMoviePaginate()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    // Guest get Main Movies

    router.get('/trendingMovie', (req, res) => {
        Movie.all_movie()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    // Guest get latest Movies

    router.get('/latestMovies', (req, res) => {
        Movie.latestMoviePaginate()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    // Guest get latest Movies

    // Guest Get movie Details and viewer count

    router.get('/movieDetails/:movieid', (req, res) => {
        let movieid = req.param('movieid');
        Movie.increase(String(movieid))
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    })

    // Guest Get movie Details and viewer count

    // Guest movie categorySearch

    router.post('/movieCategory', (req, res) => {
        let category = req.body.category;
        Movie.categorySearch(category)
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    // Guest movie categorySearch

    // Guest movie paginate

    router.get('/movie/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Movie.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    });

    // Guest movie paginate

    // Guest movie season

    router.post('/movieSeason', (req, res) => {
        let episodes = req.body.episodes;
        Movie.episodes(episodes)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    // Guest movie season

    router.post('/findMovie', (req, res) => {
        let name = req.body.name;
        Movie.findMoviebyname(name)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    })
    // Guest job paginate

    router.get('/job/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Job.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    });

    // Guest paginate ads 

    router.get('/ads/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Ads.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    return router;

}







