/* eslint-env node */
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    nodeModulesToVendor: [
      'node_modules/dropzone/dist/min'
    ]
  });

  app.import('vendor/dropzone.min.js');
  app.import('vendor/dropzone.min.css');

  return app.toTree();
};
