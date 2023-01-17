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

    // Admin login route

    router.post('/modLogin', (req, res) => {

        let email = req.body.email;
        let password = req.body.password;

        Mod.findByModemail(email)
            .then(mod => {
                bcrypt.compare(password, mod.password)
                    .then(result => {
                        if (result) {
                            let payload = { email: mod.email, name: mod.name };
                            let token = jwt.sign(payload, process.env.SECRET);
                            res.json({ con: true, token: token });
                        } else {
                            res.json({ con: false, msg: 'password wrong' })
                        }
                    }).catch(err => res.send({ con: false, msg: err }));
            })
            .catch(err => res.send({ con: false, msg: "Mod login error" }));
    });

    // Admin Register route


    router.get('/update', (req, res) => {
        let modobj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        Mod.update_mod(modobj)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })
    // Admin Movie Part 

    router.post('/post/movie', upload.single('image'), (req, res) => {
        let movieobj = {
            name: req.file.name,
            image: req.file.filename,
            Duration: req.file.Duration,
            rating: req.file.rating,
            creater: req.file.creater,
            discription: req.file.discription,
            series: req.file.series,
            trailer1: req.file.trailer,
            trailer2: req.file.trailer,
            trailer3: req.file.trailer,
            Network: req.file.Network,
            age_rating: req.file.age_rating,
            weekly_download: req.file.weekly_download,
            download1: req.file.download1,
            download2: req.file.download2,
            download3: req.file.download3,
            download4: req.file.download4,
            download5: req.file.download5,
            download6: req.file.download6,
            download7: req.file.download7,
            download8: req.file.download8,
            download9: req.file.download9,
            download10: req.file.download10,
            encoder: req.file.encoder,
            translator: req.file.translator

        };
        Movie.save_Movie(movieobj)
            .then(result => res.json({ con: true, msg: movieobj }))
            .catch(err => res.json({ con: false, msg: err }));
    })

    router.get('/update/movie', (req, res) => {
        let movieobj = {
            name: req.file.name,
            image: req.file.filename,
            Duration: req.file.Duration,
            rating: req.file.rating,
            creater: req.file.creater,
            discription: req.file.discription,
            series: req.file.series,
            trailer1: req.file.trailer,
            trailer2: req.file.trailer,
            trailer3: req.file.trailer,
            Network: req.file.Network,
            age_rating: req.file.age_rating,
            weekly_download: req.file.weekly_download,
            download1: req.file.download1,
            download2: req.file.download2,
            download3: req.file.download3,
            download4: req.file.download4,
            download5: req.file.download5,
            download6: req.file.download6,
            download7: req.file.download7,
            download8: req.file.download8,
            download9: req.file.download9,
            download10: req.file.download10,
            encoder: req.file.encoder,
            translator: req.file.translator

        };

        Job.update(movieobj)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    // Admin movie paginate

    router.get('/movie/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Movie.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    });

    // Admin get all movie

    router.get('/movies', (req, res) => {
        Movie.all_Movies()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    // Admin delete movie

    router.post('/delete/movie', (req, res) => {
        let movie_name = req.body.name;
        Movie.destroy(movie_name)
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
        then(result => res.json({ con: true, msg: jobObj }))
            .catch(err => res.json({ con: false, msg: err }));

    });

    router.get('/all/job', (req, res) => {
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

    router.post('/delete/job', (req, res) => {
        let job_name = req.body.name;
        Job.destroy(job_name)
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

    router.post('/post/ads', (req, res) => {
        let ads = {
            name: req.body.name,
            discription: req.body.discription

        };
        Ads.save_ads(ads)
        then(result => res.json({ con: true, msg: ads }))
            .catch(err => res.json({ con: false, msg: err }));

    });

    router.get('/all/ads', (req, res) => {
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
        let ads_name = req.body.name;
        Ads.delete_ads(ads_name)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })

    router.get('/update/ads', (req, res) => {
        let adsObj = {
            name: req.body.name,
        };

        Ads.update_ads(adsObj)
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })
    // ads


    return router;

}