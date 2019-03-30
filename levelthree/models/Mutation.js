const mongoose = require('mongoose');

let mutationSchema = new mongoose.Schema({
    dna: String,
    count: Number,
    mutation: Boolean
});

const Mutation = mongoose.model('Mutation', mutationSchema);

module.exports = Mutation;