const commandLineArgs = require('command-line-args')
const Server = require('./Server')

const optionDefinitions = [
  { name: 'port', alias: 'p', type: Number },
  { name: 'address', alias: 'a', type: String },
  { name: 'verbose', alias: 'v', type: Boolean }
];

let options = commandLineArgs(optionDefinitions);

let server = new Server(options.verbose);

server.listen(options.port, options.address);
