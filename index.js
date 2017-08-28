const commandLineArgs = require('command-line-args')
const Server = require('./Server')

const optionDefinitions = [
  { name: 'port', alias: 'p', type: Number },
  { name: 'address', alias: 'a', type: String },
];

let options = commandLineArgs(optionDefinitions);

console.log(options);

let server = new Server();

server.listen(options.port, options.address);
