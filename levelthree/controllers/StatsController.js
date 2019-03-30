'use strict'

const Mutation = require('../models/Mutation');

async function show(req, res) {
    try {
        let count_mutations = await Mutation.find({mutation: true});
        count_mutations = count_mutations.map(e => e.count).reduce((a, b) => a + b);

        let count_no_mutations = await Mutation.find({mutation: false});
        count_no_mutations = count_no_mutations.map(e => e.count).reduce((a, b) => a + b);

        res.status(200).json({
            count_mutations,
            count_no_mutations,
            ratio: count_mutations/count_no_mutations})
    } catch(err){
        res.status(500).json({message: 'Error en el servidor', error: err});
    }
}

module.exports = {show}