let db = require('./db');

let MainMovie = db.MainMovie;

let all_Movies = () => {
    return new Promise((resolve, reject) => {
        MainMovie.find({}, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
};

let save_Movie = (movieObj) => {
    return new Promise((resolve, reject) => {
        movieObj['since'] = new Date();
        let movie = new MainMovie(movieObj);
        movie.save((err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
};

let update = (movieobj) => {
    return new Promise((resolve, reject) => {
        MainMovie.findOne({ name: movieobj.name }, (error, data) => {
            if (error) {
                reject(error);
            } else {
                data.name = movieobj.name;
                data.image = movieobj.image;
                data.Duration = movieobj.Duration;
                data.rating = movieobj.rating;
                data.creater = movieobj.creater;
                data.discription = movieobj.discription;
                data.series = movieobj.series;
                data.trailer = movieobj.trailer;
                data.Network = movieobj.Network;
                data.age_rating = movieobj.age_rating;
                data.weekly_download = movieobj.weekly_download;
                data.download1 = movieobj.download1;
                data.download2 = movieobj.download2;
                data.download3 = movieobj.download3;
                data.download4 = movieobj.download4;
                data.download5 = movieobj.download5;

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
        MainMovie.deleteOne({ name: movieobj.name }, (error, data) => {
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
        MainMovie.paginate({}, paginateObj, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}

let findMovie = (movieName) => {
    return new Promise((resolve, reject) => {
        MainMovie.findOne({ name: movieName }, (error, data) => {
            if (data == null) {
                reject(`Movie not found! ${error}`);
            } else {
                resolve(data);
            }
        })
    })
}
module.exports = {
    all_Movies,
    save_Movie,
    update,
    destroy,
    paginate,
    findMovie
}


