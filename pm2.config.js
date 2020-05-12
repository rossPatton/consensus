// options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
const { DEBUG, NODE_ENV } = process.env;

let cluster = {};
if (NODE_ENV === 'production') {
  cluster = {
    exec_mode: 'cluster',
    instances: '2',
  };
}

module.exports = {
  apps: [{
    name: 'consensus',
    script: './dist/server.js',
    node_args: ['--max-old-space-size=8192'],
    autorestart: NODE_ENV === 'production',
    watch: NODE_ENV === 'development',
    max_memory_restart: '1G',
    ...cluster,
  }],
};
