import app from '../resource-server.js';
import { createServer } from 'http';
import { config } from 'dotenv';
config();

let port = process.env.PORT || 8080;
app.set('port', port);

let server = createServer(app);

server.listen(port);
server.on('Error', onError);
console.log("Listening on port: ", port);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}
