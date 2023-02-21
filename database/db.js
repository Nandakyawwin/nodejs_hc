const mongoose = require('mongoose')
paginate = require('mongoose-paginate');
let url = 'mongodb://127.0.0.1:27017/happychannelDatabase';
const connect = mongoose.connect(url, { useNewUrlParser: true });
let autoI = require('simple-mongoose-autoincrement');
let Schema = mongoose.Schema;


let MovieScheme = new Schema({
    name: { type: String },
    image: { type: String },
    coverimage: { type: String },
    Duration: { type: String },
    category: { type: String },
    rating: { type: String },
    count: { type: Number },
    creater: { type: String },
    overview: { type: String },
    date: { type: String },
    episodes: { type: String },
    season: { type: String },
    trailer1: { type: String },
    trailer2: { type: String },
    trailer3: { type: String },
    Network: { type: String },
    age_rating: { type: String },
    weekly_download: { type: String },
    download1site: { type: String },
    download1Low: { type: String },
    download1Lowtext: { type: String },
    download1High: { type: String },
    download1Hightext: { type: String },
    download2site: { type: String },
    download2Low: { type: String },
    download2Lowtext: { type: String },
    download2High: { type: String },
    download2Hightext: { type: String },
    download3site: { type: String },
    download3Low: { type: String },
    download3Lowtext: { type: String },
    download3High: { type: String },
    download3Hightext: { type: String },
    download4site: { type: String },
    download4Low: { type: String },
    download4Lowtext: { type: String },
    download4High: { type: String },
    download4Hightext: { type: String },
    download5site: { type: String },
    download5Low: { type: String },
    download5Lowtext: { type: String },
    download5High: { type: String },
    download5Hightext: { type: String },
    download6site: { type: String },
    download6Low: { type: String },
    download6Lowtext: { type: String },
    download6High: { type: String },
    download6Hightext: { type: String },
    download7site: { type: String },
    download7Low: { type: String },
    download7Lowtext: { type: String },
    download7High: { type: String },
    download7Hightext: { type: String },
    download8site: { type: String },
    download8Low: { type: String },
    download8Lowtext: { type: String },
    download8High: { type: String },
    download8Hightext: { type: String },
    download9site: { type: String },
    download9Low: { type: String },
    download9Lowtext: { type: String },
    download9High: { type: String },
    download9Hightext: { type: String },
    download10site: { type: String },
    download10Low: { type: String },
    download10Lowtext: { type: String },
    download10High: { type: String },
    download10Hightext: { type: String },
    encoder: { type: String },
    translator: { type: String },
    uploader: { type: String },
    since: { type: Date, required: true },

});

let UserScheme = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    since: { type: Date, required: true }

});

let AdminScheme = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    since: { type: Date, required: true },

});

let ModScheme = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    since: { type: Date, required: true },

});

let commentScheme = new Schema({
    author: { type: String, required: true },
    value: { type: String, required: true },
    since: { type: Date, required: true }
});

let adsScheme = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    since: { type: Date, required: true }
})

let jobScheme = new Schema({
    discription: { type: String, required: true },
    name: { type: String, required: true },
    since: { type: Date, required: true }
})

let SearchScheme = new Schema({
    count: { type: String },
    movieName: { type: String },
    since: { type: Date, required: true }
})

SearchScheme.plugin(autoI, { field: 'searchId' });
SearchScheme.plugin(paginate);
let Search = mongoose.model('search', SearchScheme);

MovieScheme.plugin(autoI, { field: 'movieid' });
MovieScheme.plugin(paginate);
let Movie = mongoose.model('movie', MovieScheme);

UserScheme.plugin(autoI, { field: 'userid' });
UserScheme.plugin(paginate);
let User = mongoose.model('user', UserScheme);

AdminScheme.plugin(autoI, { field: 'adminId' });
AdminScheme.plugin(paginate);
let Admin = mongoose.model('admin', AdminScheme);

ModScheme.plugin(autoI, { field: 'modId' });
ModScheme.plugin(paginate);
let Mod = mongoose.model('modId', ModScheme);

jobScheme.plugin(autoI, { field: 'jobId' });
jobScheme.plugin(paginate);
let Job = mongoose.model('job', jobScheme);

commentScheme.plugin(autoI, { field: 'commentId' });
let Comment = mongoose.model('comment', commentScheme);

adsScheme.plugin(autoI, { field: 'adsId' });
let Ads = mongoose.model('ads', adsScheme);

module.exports = {
    Movie,
    User,
    Admin,
    Comment,
    Ads,
    Job,
    Mod,
    Search
}