let multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './imgs')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage });

module.exports = (express, bodyParser) => {
    let router = express.Router();
    let jwt = require('jsonwebtoken'),
        passport = require('passport');
    let bcrypt = require('../helper/pass');
    let Admin = require('../database/admin');
    let Movie = require('../database/movie');
    let Job = require('../database/job');
    let User = require('../database/user');
    let Ads = require('../database/ads');
    let Mod = require('../database/mod');
    let MainMovie = require('../database/mainMovie');

    // Admin login route

    router.post('/adminLogin', (req, res) => {

        let email = req.body.email;
        let password = req.body.password;

        Admin.findByAdminemail(email)
            .then(admin => {
                bcrypt.compare(password, admin.password)
                    .then(result => {
                        if (result) {
                            let payload = { email: admin.email, name: admin.name };
                            let token = jwt.sign(payload, process.env.SECRET);
                            res.json({ con: true, token: token, name: admin });
                        } else {
                            res.json({ con: false, msg: 'password wrong' })
                        }
                    }).catch(err => res.send({ con: false, msg: err }));
            })
            .catch(err => res.send({ con: false, msg: "admin login error" }));
    });

    // Admin Register route

    router.post('/adminRegister',  (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        bcrypt.encrypt(password)
            .then(result => {
                let adminobj = {
                    'email': email,
                    'name': name,
                    'password': result
                };
                Admin.save_admin(adminobj)
                    .then(admin => res.json({ con: true, msg: admin }))
                    .catch(err => res.json({ con: false, msg: err }));

            })
            .catch(err => res.json({ con: false, msg: err }));
    });


    router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
        Admin.all_admin()
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }));

    });

    router.get('/update', passport.authenticate('jwt', { session: false }), (req, res) => {
        let adminobj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        Admin.update_admin(adminobj)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })
    // Admin Movie Part 

    // passport.authenticate('jwt', { session: false }),
    router.post('/post/movie', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res) => {
        let movieobj = {
            name: req.body.name,
            image: req.file.filename,
            Duration: req.body.Duration,
            rating: req.body.rating,
            creater: req.body.creater,
            category: req.body.category,
            overview: req.body.overview,
            series: req.body.series,
            trailer1: req.body.trailer1,
            trailer2: req.body.trailer2,
            trailer3: req.body.trailer3,
            Network: req.body.Network,
            age_rating: req.body.age_rating,
            // weekly_download: req.body.weekly_download,

            // 1
            download1site: req.body.download1site,
            download1Low: req.body.download1Low,
            download1Lowtext: req.body.download1Lowtext,
            download1High: req.body.download1High,
            download1Hightext: req.body.download1Hightext,

            // 1
            // 1
            download2site: req.body.download2site,
            download2Low: req.body.download2Low,
            download2Lowtext: req.body.download2Lowtext,
            download2High: req.body.download2High,
            download2Hightext: req.body.download2Hightext,

            // 1
            // 1
            download3site: req.body.download3site,
            download3Low: req.body.download3Low,
            download3Lowtext: req.body.download3Lowtext,
            download3High: req.body.download3High,
            download3Hightext: req.body.download3Hightext,

            // 1
            // 1
            download4site: req.body.download4site,
            download4Low: req.body.download4Low,
            download4Lowtext: req.body.download4Lowtext,
            download4High: req.body.download4High,
            download4Hightext: req.body.download4Hightext,

            // 1
            // 1
            download5site: req.body.download5site,
            download5Low: req.body.download5Low,
            download5Lowtext: req.body.download5Lowtext,
            download5High: req.body.download5High,
            download5Hightext: req.body.download5Hightext,

            // 1
            // 1
            download6site: req.body.download6site,
            download6Low: req.body.download6Low,
            download6Lowtext: req.body.download6Lowtext,
            download6High: req.body.download6High,
            download6Hightext: req.body.download6Hightext,

            // 1
            // 1
            download7site: req.body.download7site,
            download7Low: req.body.download7Low,
            download7Lowtext: req.body.download7Lowtext,
            download7High: req.body.download7High,
            download7Hightext: req.body.download7Hightext,

            // 1
            // 1
            download8site: req.body.download8site,
            download8Low: req.body.download8Low,
            download8Lowtext: req.body.download8Lowtext,
            download8High: req.body.download8High,
            download8Hightext: req.body.download8Hightext,

            // 1
            // 1
            download9site: req.body.download9site,
            download9Low: req.body.download9Low,
            download9Lowtext: req.body.download9Lowtext,
            download9High: req.body.download9High,
            download9Hightext: req.body.download9Hightext,

            // 1
            // 1
            download10site: req.body.download10site,
            download10Low: req.body.download10Low,
            download10Lowtext: req.body.download10Lowtext,
            download10High: req.body.download10High,
            download10Hightext: req.body.download10Hightext,

            // 1
            encoder: req.body.encoder,
            translator: req.body.translator,
            uploader: req.body.uploader

        };
        Movie.save_Movie(movieobj)
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }));
    })

    // post bug fix
    router.get('/update/movie', passport.authenticate('jwt', { session: false }), (req, res) => {
        let movieobj = {
            name: req.body.name,
            image: req.file.filename,
            Duration: req.body.Duration,
            rating: req.body.rating,
            creater: req.body.creater,
            category: req.body.category,
            overview: req.body.overview,
            series: req.body.series,
            trailer1: req.body.trailer1,
            trailer2: req.body.trailer2,
            trailer3: req.body.trailer3,
            Network: req.body.Network,
            age_rating: req.body.age_rating,
            // weekly_download: req.body.weekly_download,

            // 1
            download1site: req.body.download1site,
            download1Low: req.body.download1Low,
            download1Lowtext: req.body.download1Lowtext,
            download1High: req.body.download1High,
            download1Hightext: req.body.download1Hightext,

            // 1
            // 1
            download2site: req.body.download2site,
            download2Low: req.body.download2Low,
            download2Lowtext: req.body.download2Lowtext,
            download2High: req.body.download2High,
            download2Hightext: req.body.download2Hightext,

            // 1
            // 1
            download3site: req.body.download3site,
            download3Low: req.body.download3Low,
            download3Lowtext: req.body.download3Lowtext,
            download3High: req.body.download3High,
            download3Hightext: req.body.download3Hightext,

            // 1
            // 1
            download4site: req.body.download4site,
            download4Low: req.body.download4Low,
            download4Lowtext: req.body.download4Lowtext,
            download4High: req.body.download4High,
            download4Hightext: req.body.download4Hightext,

            // 1
            // 1
            download5site: req.body.download5site,
            download5Low: req.body.download5Low,
            download5Lowtext: req.body.download5Lowtext,
            download5High: req.body.download5High,
            download5Hightext: req.body.download5Hightext,

            // 1
            // 1
            download6site: req.body.download6site,
            download6Low: req.body.download6Low,
            download6Lowtext: req.body.download6Lowtext,
            download6High: req.body.download6High,
            download6Hightext: req.body.download6Hightext,

            // 1
            // 1
            download7site: req.body.download7site,
            download7Low: req.body.download7Low,
            download7Lowtext: req.body.download7Lowtext,
            download7High: req.body.download7High,
            download7Hightext: req.body.download7Hightext,

            // 1
            // 1
            download8site: req.body.download8site,
            download8Low: req.body.download8Low,
            download8Lowtext: req.body.download8Lowtext,
            download8High: req.body.download8High,
            download8Hightext: req.body.download8Hightext,

            // 1
            // 1
            download9site: req.body.download9site,
            download9Low: req.body.download9Low,
            download9Lowtext: req.body.download9Lowtext,
            download9High: req.body.download9High,
            download9Hightext: req.body.download9Hightext,

            // 1
            // 1
            download10site: req.body.download10site,
            download10Low: req.body.download10Low,
            download10Lowtext: req.body.download10Lowtext,
            download10High: req.body.download10High,
            download10Hightext: req.body.download10Hightext,

            // 1
            encoder: req.body.encoder,
            translator: req.body.translator,
            uploader: req.body.uploader

        };
        Movie.update(movieobj)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })
    // passport.authenticate('jwt', { session: false }),

    router.get('/findmovie/:movieid', (req, res) => {
        let movieid = req.param('movieid');
        Movie.findByMovieID(String(movieid))
            .then(result => res.json({ con: "hehe", msg: result }))
            .catch(err => res.json({ con: false, msg: err }));
        // res.send(id)
    })
    // passport.authenticate('jwt', { session: false }),
    router.post('/findMovie',  (req, res) => {
        let name = req.body.name;
        Movie.findMoviebyname(name)
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }));
    })
    // Admin movie paginate

    router.get('/movie/paginate/:start/:count', passport.authenticate('jwt', { session: false }), (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Movie.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    });

    // Admin get all movie

    router.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
        Movie.all_Movies()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    // Admin delete movie

    router.post('/delete/movie', passport.authenticate('jwt', { session: false }), (req, res) => {
        let name = req.body.name;
        Movie.destroy(name)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })


    // passport.authenticate('jwt', { session: false }),
    router.post('/post/mainmovie', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res) => {
        let movieobj = {
            name: req.body.name,
            image: req.file.filename,
            Duration: req.body.Duration,
            rating: req.body.rating,
            creater: req.body.creater,
            category: req.body.category,
            overview: req.body.overview,
            episodes: req.body.episodes,
            trailer1: req.body.trailer1,
            trailer2: req.body.trailer2,
            trailer3: req.body.trailer3,
            Network: req.body.Network,
            age_rating: req.body.age_rating,
            weekly_download: req.body.weekly_download,

            // 1
            download1site: req.body.download1site,
            download1Low: req.body.download1Low,
            download1Lowtext: req.body.download1Lowtext,
            download1High: req.body.download1High,
            download1Hightext: req.body.download1Hightext,

            // 1
            // 1
            download2site: req.body.download2site,
            download2Low: req.body.download2Low,
            download2Lowtext: req.body.download2Lowtext,
            download2High: req.body.download2High,
            download2Hightext: req.body.download2Hightext,

            // 1
            // 1
            download3site: req.body.download3site,
            download3Low: req.body.download3Low,
            download3Lowtext: req.body.download3Lowtext,
            download3High: req.body.download3High,
            download3Hightext: req.body.download3Hightext,

            // 1
            // 1
            download4site: req.body.download4site,
            download4Low: req.body.download4Low,
            download4Lowtext: req.body.download4Lowtext,
            download4High: req.body.download4High,
            download4Hightext: req.body.download4Hightext,

            // 1
            // 1
            download5site: req.body.download5site,
            download5Low: req.body.download5Low,
            download5Lowtext: req.body.download5Lowtext,
            download5High: req.body.download5High,
            download5Hightext: req.body.download5Hightext,

            // 1
            // 1
            download6site: req.body.download6site,
            download6Low: req.body.download6Low,
            download6Lowtext: req.body.download6Lowtext,
            download6High: req.body.download6High,
            download6Hightext: req.body.download6Hightext,

            // 1
            // 1
            download7site: req.body.download7site,
            download7Low: req.body.download7Low,
            download7Lowtext: req.body.download7Lowtext,
            download7High: req.body.download7High,
            download7Hightext: req.body.download7Hightext,

            // 1
            // 1
            download8site: req.body.download8site,
            download8Low: req.body.download8Low,
            download8Lowtext: req.body.download8Lowtext,
            download8High: req.body.download8High,
            download8Hightext: req.body.download8Hightext,

            // 1
            // 1
            download9site: req.body.download9site,
            download9Low: req.body.download9Low,
            download9Lowtext: req.body.download9Lowtext,
            download9High: req.body.download9High,
            download9Hightext: req.body.download9Hightext,

            // 1
            // 1
            download10site: req.body.download10site,
            download10Low: req.body.download10Low,
            download10Lowtext: req.body.download10Lowtext,
            download10High: req.body.download10High,
            download10Hightext: req.body.download10Hightext,

            // 1


            encoder: req.body.encoder,
            translator: req.body.translator,
            uploader: req.body.uploader

        };

        MainMovie.save_Movie(movieobj)
            .then(result => res.json({ con: true, msg: movieobj }))
            .catch(err => res.json({ con: false, msg: err }));
    })

    router.get('/update/mainmovie', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res) => {
        let movieobj = {
            name: req.body.name,
            image: req.file.filename,
            Duration: req.body.Duration,
            rating: req.body.rating,
            creater: req.body.creater,
            category: req.body.category,
            overview: req.body.overview,
            episodes: req.body.episodes,
            trailer1: req.body.trailer1,
            trailer2: req.body.trailer2,
            trailer3: req.body.trailer3,
            Network: req.body.Network,
            age_rating: req.body.age_rating,
            weekly_download: req.body.weekly_download,

            // 1
            download1site: req.body.download1site,
            download1Low: req.body.download1Low,
            download1Lowtext: req.body.download1Lowtext,
            download1High: req.body.download1High,
            download1Hightext: req.body.download1Hightext,

            // 1
            // 1
            download2site: req.body.download2site,
            download2Low: req.body.download2Low,
            download2Lowtext: req.body.download2Lowtext,
            download2High: req.body.download2High,
            download2Hightext: req.body.download2Hightext,

            // 1
            // 1
            download3site: req.body.download3site,
            download3Low: req.body.download3Low,
            download3Lowtext: req.body.download3Lowtext,
            download3High: req.body.download3High,
            download3Hightext: req.body.download3Hightext,

            // 1
            // 1
            download4site: req.body.download4site,
            download4Low: req.body.download4Low,
            download4Lowtext: req.body.download4Lowtext,
            download4High: req.body.download4High,
            download4Hightext: req.body.download4Hightext,

            // 1
            // 1
            download5site: req.body.download5site,
            download5Low: req.body.download5Low,
            download5Lowtext: req.body.download5Lowtext,
            download5High: req.body.download5High,
            download5Hightext: req.body.download5Hightext,

            // 1
            // 1
            download6site: req.body.download6site,
            download6Low: req.body.download6Low,
            download6Lowtext: req.body.download6Lowtext,
            download6High: req.body.download6High,
            download6Hightext: req.body.download6Hightext,

            // 1
            // 1
            download7site: req.body.download7site,
            download7Low: req.body.download7Low,
            download7Lowtext: req.body.download7Lowtext,
            download7High: req.body.download7High,
            download7Hightext: req.body.download7Hightext,

            // 1
            // 1
            download8site: req.body.download8site,
            download8Low: req.body.download8Low,
            download8Lowtext: req.body.download8Lowtext,
            download8High: req.body.download8High,
            download8Hightext: req.body.download8Hightext,

            // 1
            // 1
            download9site: req.body.download9site,
            download9Low: req.body.download9Low,
            download9Lowtext: req.body.download9Lowtext,
            download9High: req.body.download9High,
            download9Hightext: req.body.download9Hightext,

            // 1
            // 1
            download10site: req.body.download10site,
            download10Low: req.body.download10Low,
            download10Lowtext: req.body.download10Lowtext,
            download10High: req.body.download10High,
            download10Hightext: req.body.download10Hightext,

            // 1


            encoder: req.body.encoder,
            translator: req.body.translator,
            uploader: req.body.uploader

        };
        MainMovie.update(movieobj)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })


    router.post('/findmainmovie', (req, res) => {
        let nameObj = {
            name: req.body.name
        }
        MainMovie.findMovie(nameObj.name)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })
    // Admin movie paginate

    router.get('/mainmovie/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        MainMovie.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    });

    // Admin get all movie

    router.get('/mainmovie', (req, res) => {
        MainMovie.all_Movies()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    // Admin delete movie

    router.post('/delete/mainmovie', (req, res) => {
        let movie_name = req.body.name;
        MainMovie.destroy(movie_name)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })




    // Admin Movie Part 

    // Job

    router.post('/post/job', (req, res) => {
        let jobObj = {
            name: req.body.name,
            discription: req.body.discription

        };
        Job.save_Job(jobObj)
            .then(result => res.json({ con: true, msg: jobObj }))
            .catch(err => res.json({ con: false, msg: err }));

    });

    router.get('/allJob', (req, res) => {
        Job.all_Job()
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

    router.post('/deleteJob', (req, res) => {
        let id = req.body._id;
        Job.destroy(id)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    router.get('/update/job', (req, res) => {
        let jobObj = {
            name: req.body.name,
            discription: req.body.discription
        };

        Job.update(jobObj)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })
    // Job

    // ads


    router.get('/allads', (req, res) => {
        Ads.all_ads()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    router.get('/ads/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Ads.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    router.post('/delete/ads', (req, res) => {
        let ads_name = req.file.filename;
        Ads.delete_ads(ads_name)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    router.get('/updateAds', upload.single('image'), (req, res) => {
        let adsObj = {
            image: req.file.filename
        };

        Ads.update_ads(adsObj)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    router.post('/postAds', upload.single('image'), (req, res) => {
        let adsobj = {
            image: req.file.filename,

        };
        Ads.save_ads(adsobj.image)
            .then(result => res.json({ con: true, msg: movieobj }))
            .catch(err => res.json({ con: false, msg: err }));
    })


    // ads

    // user

    router.get('/all/user', (req, res) => {
        User.all_users()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });


    router.get('/user/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        User.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    router.post('/delete/user', (req, res) => {
        let user_name = req.body.name;
        User.delete_user(user_name)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    router.get('/update/user', (req, res) => {
        let userObj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        User.update_user(userObj)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })
    // user

    // Mod

    router.get('/all/mod', (req, res) => {
        Mod.all_mod()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });


    router.get('/mod/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Mod.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    router.post('/delete/mod', (req, res) => {
        let user_name = req.body.name;
        Mod.delete_mod(user_name)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    router.get('/update/mod', (req, res) => {
        let modObj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        Mod.update_mod(modObj)
            .then(result => res.json({ con: true, msg: result }))
            .catch(err => res.json({ con: false, msg: err }));
    })

    // Mod
    return router;

}