const WebpackBeforeBuildPlugin = require('before-build-webpack');
const fs = require('fs');

class WaitPlugin extends WebpackBeforeBuildPlugin {
  constructor(file, interval = 100) {
    super(function(stats, callback) {
      let start = Date.now();


      function poll() {
        if (fs.existsSync(file)) {
          callback();
        } else {
          setTimeout(poll, interval);
        }
      }

      poll();
    })
  }
}

module.exports = WaitPlugin;
