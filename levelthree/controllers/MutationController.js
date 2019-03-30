'use strict'
const Mutation = require('../models/Mutation');

function find(req, res, next) {
    const dna = DNAConvertString(req.DNA);
    Mutation.findOne({dna})
    .then(doc => {        
        if(!doc) {
            req.mutation = new Mutation({dna, count: 1});
            return next();
        }

        doc.count = doc.count + 1;
        doc.save().then(doctwo => {
            let status = 403;
            if(doctwo.mutation) status = 200;
            return res.status(status).json({mutation: doctwo.mutation});
        })
    }).catch(err => {
        return res.status(500).json({message: 'Hubo un error', error: err});
    })
}


function mutation(req, res) {
    let mutation, status;

    if(hasMutation(req.DNA)) {
        mutation = true;
        status = 200;
        // res.status(200).json({mutation: true});

    } else {
        mutation = false;
        status = 403;
        // res.status(403).json({mutation: false});        
    }

    req.mutation.mutation = mutation;
    req.mutation.save().then(doc => {
        console.log('eerror')
        return res.status(status).json({mutation})
    });

}

function DNAConvertString(DNA) {
    let dna = '';
    DNA.forEach(row => {
        if (dna === '') {
            dna = row;
        }
        else {
            dna += ',' + row;
        }
    });
    return dna;
}

function hasMutation(DNA) {
    // Prepare DNA for to Search
    let DNAReady = prepareForTheSearch(DNA);

    const REGULAR_EXPRESION = /GGGG|CCCC|AAAA|TTTT/;
    let mutations = [];

    // Search mutations of horizontal shapes
    const horizontal = DNAReady.horizontal.filter(
        row => REGULAR_EXPRESION.test(row)
    );

    // Search mutations of vertical shapes
    const vertical = DNAReady.vertical.filter(
        row => REGULAR_EXPRESION.test(row)
    );

    // Search mutations of oblique shapes
    const oblique = DNAReady.oblique.filter(
        row => REGULAR_EXPRESION.test(row)
    );

    // Search mutations of obliqueReverse shapes
    const obliqueReverse = DNAReady.obliqueReverse.filter(
        row => REGULAR_EXPRESION.test(row)
    );


    // Checkn that there are mutation and add to mutations
    if(horizontal.length > 0){
        mutations = mutations.concat(horizontal);   
    }
    if(vertical.length > 0){
        mutations = mutations.concat(vertical)
    }
    if(oblique.length > 0){
        mutations = mutations.concat(oblique);
    }
    if(obliqueReverse.length > 0){
        mutations = mutations.concat(obliqueReverse);
    }

    /// Check that mutation be greater than 2
    if(mutations.length > 1) return true;
    return false;
}

// Prepare ADN for to search horizontally, vertically and oblique 
function prepareForTheSearch(ADN) {
    let vertical = [], oblique = [], obliqueReverse = [];

    // Go through the array for rows
    ADN.map((row, idx) => {

        // Separate the row by letters to go through them individually
        row.split('').map((column, index) => {
            // Add this column vertically
            if(vertical[index] != undefined) {
                // If vertical array is not undefined concatenate this value to the corresponding column
                vertical[index] = vertical[index] + column;
            } else {
                // If the vertical array is undefined to initialize with a value; 
                vertical[index] = column;
            }

            // Add new row way oblique
            if(oblique[idx + index] != undefined) {
                // If oblique array is not undefined concatenate this value to the corresponding row
                oblique[idx + index] = oblique[idx + index] + column; 
            } else {
                // If the oblique array is undefined to initialize with a value; 
                oblique[idx + index] = column;
            }

        });

        // Add new rows in the obliqueReverse
        row.split('').reverse().map((column, index) => {
            if(obliqueReverse[idx + index] != undefined) {
                // If obliqueReverse array is not undefined concatenate this value to the corresponding row
                obliqueReverse[idx + index] = obliqueReverse[idx + index] + column; 
            } else {
                // If the obliqueReverse array is undefined to initialize with a value; 
                obliqueReverse[idx + index] = column;
            }
        });

    });

    return {
        horizontal: ADN,
        vertical,
        oblique,
        obliqueReverse
    }
}

module.exports = {mutation, find, hasMutation, DNAConvertString}

//["ATTCGA","GCATGA","CCGGAA","ACGGCA","GCTACG","TCTCTG"]
//['ATTCGA','ATTCGA','GCATGA','CCGGAA','ACGGCA','GCTACG','TCACTG']