let db = require('./db');

let User = db.User;

let all_users = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let save_user = (userObj) => {
    return new Promise((resolve, reject) => {
        userObj['since'] = new Date();
        userObj['role'] = 'user';
        let user = new User(userObj);
        user.save((error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let delete_user = (username) => {
    return new Promise((resolve, reject) => {
        User.deleteOne({ name: username }, (error, data) => {
            if (error) reject(error);
            resolve('Deleted user..');
        })
    })
};

let update_user = (userObj) => {
    return new Promise((resolve, reject) => {
        User.findOne({ name: userObj.name }, (error, data) => {
            if (error) {
                reject(error);
            } else {
                data.email = userObj.email;
                data.name = userObj.name;
                data.password = userObj.password;
                data.save((error, data) => {
                    if (error) reject(error);
                    resolve(data);
                })
            }
        })
    })
};

let findUserbyemail = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ emai: email }, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}

let checkEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.find({ email: email }, (error, data) => {
            if (error) reject(error);
            resolve(data);
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
        User.paginate({}, paginateObj, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}

module.exports = {
    all_users,
    save_user,
    update_user,
    delete_user,
    findUserbyemail,
    checkEmail,
    paginate

}