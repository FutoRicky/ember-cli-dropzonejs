/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-dropzonejs',
  included: function(app) {
    this._super.included.apply(this, arguments);

    var host = this._findHost();

    var options = host.options && host.options.emberCliDropzonejs || { includeDropzoneCss: true };

    if (!process.env.EMBER_CLI_FASTBOOT) {
      // This will only be included in the browser build
      this.import(host.bowerDirectory + '/dropzone/dist/dropzone.js');
    }

    if (options.includeDropzoneCss){
      this.import(host.bowerDirectory + '/dropzone/dist/dropzone.css');
    }
  }
};
