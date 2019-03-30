const server = require('./app');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if(process.env.NODE_ENV != 'test') {
    mongoose.connect('mongodb://localhost:27017/dna', { useNewUrlParser: true })
    .then(req => {
        console.log('conexion a la base de datos echa');
        server.listen(server.get('port'), () => console.log('App corriendo en el puerto: ', server.get('port')));
    })
    .catch(console.log);
} else {
    server.listen(server.get('port'), () => console.log('App corriendo en el puerto: ', server.get('port')));
}



module.exports = server;