let db = require('./db');

let Ads = db.Ads;

let all_ads = () => {
    return new Promise((resolve, reject) => {
        Ads.find({}, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let save_ads = (adsObj) => {
    return new Promise((resolve, reject) => {
        adsObj['since'] = new Date();
        let ads = new Ads(adsObj);
        ads.save((error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let update_ads = (adsObj) => {
    return new Promise((resolve, reject) => {
        if (error) {
            reject(error);
        } else {
            data.name = adsObj.name;
            data.image = adsObj.image;
            data.save((error, data) => {
                if (error) reject(error);
                resolve(data);
            })
        }
    })
};

let delete_ads = (adsObj) => {
    return new Promise((resolve, reject) => {
        Ads.deleteOne({ name: adsObj.name }, (error, data) => {
            if (error) reject(error);
            resolve('Ok!Ads has been removed!');
        })
    })
};

let find_ads = (adsObj) => {
    return new Promise((resolve, reject) => {
        Ads.findOne({ name: adsObj.name }, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}

let paginate = (start, count) => {
    let paginateObj = {
        sort: { since: -1 },
        lean: true,
        page: start,
        limit: count
    };
    return new Promise((resolve, reject) => {
        Ads.paginate({}, paginateObj, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}

module.exports = {
    all_ads,
    save_ads,
    find_ads,
    update_ads,
    delete_ads,
    paginate
}