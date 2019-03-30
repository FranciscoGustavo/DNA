const server = require('./app');

server.listen(server.get('port'), () => console.log('App corriendo en el puerto: ', server.get('port')));

module.exports = server;