'use strict'

const express = require('express');
const morgan = require('morgan');

// Load Routes
const DNARouter = require('./routes/danrouter');
const StatsRouter = require('./routes/statsrouter');

let app = express();

app.set('port', process.env.PORT || 3000);

app
	.use( morgan('dev') )
	.use( express.json() )
	.use( express.urlencoded({ extended: false }) )

	// Configure CORS
	.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
		res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	
		next();
	})

	.use( DNARouter )
	.use( StatsRouter )

module.exports = app;