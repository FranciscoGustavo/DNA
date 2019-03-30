const mongoose = require('mongoose');

before(done => {
    mongoose.connect("mongodb://heroku_5hc4vf46:27re389lc885b1rii5cgukhdl@ds147003.mlab.com:47003/heroku_5hc4vf46", { useNewUrlParser: true });
    mongoose.connection.once("open", () => {
        console.log('Conected to DB');
        done();
    }).on('error', err=> {
        console.warn('Warning', err);
    });
});