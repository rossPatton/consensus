const { DEBUG, NODE_ENV } = process.env;

// enables cluster mode basically, up to max number of available cores
let clusterMode = {};
if (NODE_ENV === 'production') {
  clusterMode = {
    instances: 'max',
    exec_mode: 'cluster'
  };
}

module.exports = {
  apps: [{
    name: 'consensus',
    script: './dist/server.js',
    // options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    node_args: ['--max-old-space-size=8192', '--inspect=9229'],
    autorestart: NODE_ENV === 'production',
    watch: NODE_ENV === 'development',
    max_memory_restart: '1G',
    ...clusterMode
  }],
};
