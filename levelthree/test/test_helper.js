const mongoose = require('mongoose');

before(done => {
    mongoose.connect("mongodb://localhost:27017/dna", { useNewUrlParser: true });
    mongoose.connection.once("open", () => {
        console.log('Conected to DB');
        done();
    }).on('error', err=> {
        console.warn('Warning', err);
    });
});