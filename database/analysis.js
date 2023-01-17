let db = require('./db');

let Click = db.Click;
let Search = db.Search;



let clickCount = (clickObj) => {
    return new Promise((resolve, reject) => {
        clickObj['since'] = new Date();
        clickObj['count'] = ++1;
        let click = new Click(clickObj)
        click.save((error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

// let searchCount = (movieName) => {
//     return new Promise((resolve, reject) => {
        
//     })
// }