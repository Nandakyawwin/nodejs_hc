let db = require('./db');

let Movie = db.Movie;

let all_Movies = () => {
    return new Promise((resolve, reject) => {
        Movie.find({}, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
};

let save_Movie = (movieObj) => {
    return new Promise((resolve, reject) => {
        movieObj['since'] = new Date();
        let movie = new Movie(movieObj);
        movie.save((err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
};

let update = (movieobj) => {
    return new Promise((resolve, reject) => {
        Movie.findOne({ name: movieobj.name }, (error, data) => {
            if (error) {
                reject(error);
            } else {
                data.name = movieobj.name;
                data.image = movieobj.image;
                data.Duration = movieobj.Duration;
                data.rating = movieobj.rating;
                data.creater = movieobj.creater;
                data.overview = movieobj.overview;
                data.episodes = movieobj.episodes;
                data.trailer1 = movieobj.trailer1;
                data.trailer2 = movieobj.trailer2;
                data.trailer3 = movieobj.trailer3;
                data.Network = movieobj.Network;
                data.age_rating = movieobj.age_rating;
                data.weekly_download = movieobj.weekly_download;
                data.download1site = movieobj.download1site;
                data.download1Low = movieobj.download1Low;
                data.download1Lowtext = movieobj.download1Lowtext;
                data.download1High = movieobj.download1High;
                data.download1Hightext = movieobj.download1Hightext;
                data.download2site = movieobj.download2site;
                data.download2Low = movieobj.download2Low;
                data.download2Lowtext = movieobj.download2Lowtext;
                data.download2High = movieobj.download2High;
                data.download2Hightext = movieobj.download2Hightext;
                data.download3site = movieobj.download3site;
                data.download3Low = movieobj.download3Low;
                data.download3Lowtext = movieobj.download3Lowtext;
                data.download3High = movieobj.download3High;
                data.download3Hightext = movieobj.download3Hightext;
                data.download4site = movieobj.download4site;
                data.download4Low = movieobj.download4Low;
                data.download4Lowtext = movieobj.download4Lowtext;
                data.download4High = movieobj.download4High;
                data.download4Hightext = movieobj.download4Hightext;
                data.download5site = movieobj.download5site;
                data.download5Low = movieobj.download5Low;
                data.download5Lowtext = movieobj.download5Lowtext;
                data.download5High = movieobj.download5High;
                data.download5Hightext = movieobj.download5Hightext;
                data.download6site = movieobj.download6site;
                data.download6Low = movieobj.download6Low;
                data.download6Lowtext = movieobj.download6Lowtext;
                data.download6High = movieobj.download6High;
                data.download6Hightext = movieobj.download6Hightext;
                data.download7site = movieobj.download7site;
                data.download7Low = movieobj.download7Low;
                data.download7Lowtext = movieobj.download7Lowtext;
                data.download7High = movieobj.download7High;
                data.download7Hightext = movieobj.download7Hightext;
                data.download8site = movieobj.download8site;
                data.download8Low = movieobj.download8Low;
                data.download8Lowtext = movieobj.download8Lowtext;
                data.download8High = movieobj.download8High;
                data.download8Hightext = movieobj.download8Hightext;
                data.download9site = movieobj.download9site;
                data.download9Low = movieobj.download9Low;
                data.download9Lowtext = movieobj.download9Lowtext;
                data.download9High = movieobj.download9High;
                data.download9Hightext = movieobj.download9Hightext;
                data.download10site = movieobj.download10site;
                data.download10Low = movieobj.download10Low;
                data.download10Lowtext = movieobj.download10Lowtext;
                data.download10High = movieobj.download10High;
                data.download10Hightext = movieobj.download10Hightext;
                data.encoder = movieobj.encoder;
                data.translator = movieobj.translator;
                data.uploader = movieobj.uploader;
                data.save((err, res) => {
                    if (err) reject(err);
                    resolve(res);
                })
            }
        })
    })
};

let destroy = (movieobj) => {
    return new Promise((resolve, reject) => {
        Movie.deleteOne({ name: movieobj }, (error, data) => {
            if (error) reject(error);
            resolve('Deleted.')
        })
    })
}

let paginate = (start, count) => {
    let paginateObj = {
        sort: { _id: 1 },
        lean: true,
        page: start,
        limit: count
    };
    console.log(`Start ${start} and Count is ${count}`);
    return new Promise((resolve, reject) => {
        Movie.paginate({}, paginateObj, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}

let findMovie = (id) => {
    return new Promise((resolve, reject) => {
        Movie.findOne({ _id: id }, (error, data) => {
            if (error) reject(error);
            resolve(data)
        })
    })
}

let findMoviebyname = (name) => {
    return new Promise((resolve, reject) => {
        Movie.find({ name: name }, (error, data) => {
            if (error) reject(error)
            resolve(data);
        })
    })
}

let findByMovieID = (id) => {
    return new Promise((resolve, reject) => {
        Movie.find({movieid: id}, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}


module.exports = {
    all_Movies,
    save_Movie,
    update,
    destroy,
    paginate,
    findMovie,
    findMoviebyname,
    findByMovieID
}


