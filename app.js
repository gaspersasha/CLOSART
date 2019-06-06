const https = require('http');
const routes = require('./routes');

const server = https.createServer(routes);

server.listen(3030);
