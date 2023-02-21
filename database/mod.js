let db = require('./db');

let Mod = db.Mod;


let all_mod = () => {
    return new Promise((resolve, reject) => {
        Mod.find({}, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let save_mod = (modObj) => {
    return new Promise((resolve, reject) => {
        modObj['since'] = new Date();
        modObj['role'] = 'mod';
        let mod = new Mod(modObj);
        mod.save((error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let update_mod = (modObj) => {
    return new Promise((resolve, reject) => {
        Mod.findOne({ name: modObj.name }, (error, data) => {
            if (error) {
                reject(error);
            } else {
                data.email = modObj.email;
                data.name = modObj.name;
                data.password = modObj.password;

                data.save((error, result) => {
                    if (error) reject(error);
                    resolve(result);
                })
            }
        })
    })
};

let delete_mod = (mod_name) => {
    return new Promise((resolve, reject) => {
        Mod.deleteOne({ name: mod_name }, (error, data) => {
            if (error) reject(error);
            resolve('Ok! Admin account is removed!');
        })
    })
}

let findByModemail = (findemail) => {
    return new Promise((resolve, reject) => {
        Mod.findOne({ email: findemail }, (error, data) => {
            if (error) reject(error);
            resolve(data)
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
        Mod.paginate({}, paginateObj, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}
module.exports = {
    all_mod,
    save_mod,
    findByModemail,
    update_mod,
    delete_mod,
    paginate
}