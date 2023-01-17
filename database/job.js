let db = require('./db');

let Job = db.Job;

let all_Job = () => {
    return new Promise((resolve, reject) => {
        Job.find({}, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
};

let save_Job = (obj) => {
    return new Promise((resolve, reject) => {
        obj['since'] = new Date();
        let job = new Job(obj);
        job.save((err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
};

let update = (obj) => {
    return new Promise((resolve, reject) => {
        Job.findOne({ name: obj.name }, (error, data) => {
            if (error) {
                reject(error);
            } else {
                data.name = obj.name;
                data.description = obj.description;
                data.save((err, res) => {
                    if (err) reject(err);
                    resolve(res);
                })
            }
        })
    })
};

let destroy = (id) => {
    return new Promise((resolve, reject) => {
        Job.deleteOne({ _id:id }, (error, data) => {
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
        Job.paginate({}, paginateObj, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}

let find = (obj) => {
    return new Promise((resolve, reject) => {
        Job.findOne({ name: obj.name }, (error, data) => {
            if (data == null) {
                reject(`Job not found! ${error}`);
            } else {
                resolve(data);
            }
        })
    })
}
module.exports = {
    all_Job,
    save_Job,
    update,
    destroy,
    paginate,
    find
}

