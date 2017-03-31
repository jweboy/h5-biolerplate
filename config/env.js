import minimist from 'minimist';

let argv = minimist(process.argv.slice(2));
let env = argv.env;

process.env.BIOLERPLATE_ENV = env;

export default env;
