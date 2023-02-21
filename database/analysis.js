let db = require('./db');

let Click = db.Click;
let Search = db.Search;



let clickCount = (clickObj) => {
    return new Promise((resolve, reject) => {
        let count = 0;
        clickObj['since'] = new Date();
        clickObj['count'] = count++;
        let click = new Click(clickObj)
        click.save((error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let searchCount = (searchName) => {
    return new Promise((resolve, reject) => {
        let count = 0;
        searchName['since'] = new Date();
        searchName['count'] = count++;
        let search = new Search();
        search.save((error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}


module.exports = {
    clickCount,
    searchCount
}