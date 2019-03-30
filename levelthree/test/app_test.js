const assert = require('assert');
const request = require('supertest');
const app = require('../server');

const MutationController = require('../controllers/MutationController'); 

describe("Express APP", () => {
    it("Handle GET request /stats", done => {
        request(app)
            .get('/stats')
            .expect('Content-Type', /application\/json/)
            .end((error, response) => {
                assert(response.body.count_mutations != undefined);
                assert(response.body.count_no_mutations != undefined);
                assert(response.body.ratio != undefined);
                done();
            })
    })
    it("Handle POST request /mutation = true", done => {
        request(app)
            .post('/mutation')
            .send({"dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]})
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, response) =>{
                assert(response.body.mutation == true);
                done();
            })
    })
    it("Handle POST request /mutation = false", done => {
        request(app)
            .post('/mutation')
            .send({"dna": ["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]})
            .expect(403)
            .expect('Content-Type', /json/)
            .end((err, response) =>{
                assert(response.body.mutation == false);
                done();
            })
    })
    it("CREATE POST request /mutation = true", done => {
        request(app)
            .post('/mutation')
            .send({"dna": ["ATGCGC","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]})
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, response) =>{
                assert(response.body.mutation == true);
                done();
            })
    })
    it("CREATE POST request /mutation = false", done => {
        request(app)
            .post('/mutation')
            .send({"dna": ["CGGTAA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]})
            .expect(403)
            .expect('Content-Type', /json/)
            .end((err, response) =>{
                assert(response.body.mutation == false);
                done();
            })
    })
    it("Handle POST request /mutation = Error", done => {
        request(app)
            .post('/mutation')
            .send({"dna": ["ATGBGA","CAFTGC","TTATTU","AGACGG","GCGTCA","TCACTG"]})
            .expect(500)
            .expect('Content-Type', /json/)
            .end((err, response) =>{
                assert(response.body.error == 'your DNA is not valid');
                done();
            })
    })
})

describe("Functions of controller", () => {
    it("Are there  mutation", done => {
        const mutation = MutationController.hasMutation(["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"])
        assert(mutation == false);
        done();
    })
    it("convert to string", done => {
        const string = MutationController.DNAConvertString(["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]);
        assert(string === 'ATGCGA,CAGTGC,TTATTT,AGACGG,GCGTCA,TCACTG');
        done();
    })
})