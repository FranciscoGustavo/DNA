'use stric'

function isDNAValid(req, res, next) {
	const REGULAR_EXPRESION = /[^ATCG]/;
    const DNA = req.body.dna;
    let isValid = true;
    DNA.forEach(row => {

        // If ADN has diferent letters to ATCG then it is not valid
        if(REGULAR_EXPRESION.test(row)) {
           // console.log('Error', row);
            isValid = false;
            //console.log(row);
        } else {
         //   console.log(row);
        }
    });

    if(!isValid) return res.status(500).json({error: 'your DNA is not valid'});
    
    req.DNA = DNA;
    next(); 
}


module.exports = isDNAValid;