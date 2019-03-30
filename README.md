# Welcome to DNA
## After Installation
You need to install [Node js](https://nodejs.org/es/) and [git](https://git-scm.com/)
## Installation
First you need clone the repository and use the master branch

	git clone https://github.com/FranciscoGustavo/DNA.git
	git checkout levelthree
Now run the following command:

	npm install

The last execute:
	
	node server.js

Ready, now you only need an http client to send requests to 

	POST http://localhost:3000/mutation
	GET http://localhost:3000/stats
Note: The database is in heroku, so it is not necessary to configure anything
## Test
To execute the automatic tests

	npm run test

To generate code coverage

	npm run coverage

You see the code coverage in the folder

	/coverage/lcov-report/index.html
