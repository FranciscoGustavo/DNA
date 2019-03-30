'use strict'

const express = require('express');
const morgan = require('morgan');
	
// Load Routes
const DNARouter = require('./routes/danrouter');

let app = express();

app.set('port', process.env.PORT || 3000);

app
	.use( morgan('dev') )
	.use( express.json() )
	.use( express.urlencoded({ extended: false }) )
	.use( DNARouter )

module.exports = app;

