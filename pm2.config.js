const { NODE_ENV } = process.env;

module.exports = {
  apps: [{
    name: 'consensus',
    script: './dist/server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: ['--max-old-space-size=8192', '--inspect=0.0.0.0'],
    // enables cluster mode basically, up to max number of available cores
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: NODE_ENV === 'production',
    watch: NODE_ENV === 'development',
    max_memory_restart: '1G',
  }],

  // deploy: {
  //   production: {
  //     user: 'node',
  //     host: '212.83.163.1',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:repo.git',
  //     path: '/var/www/production',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //   },
  // },
};
