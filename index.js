/* eslint-env node */
/* jshint node: true */
'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);
    let options = app.options.emberCliDropzonejs || {
      includeDropzoneCss: true,
    };

    this.import('node_modules/dropzone/dist/min/dropzone.min.js');

    if (options.includeDropzoneCss) {
      this.import('node_modules/dropzone/dist/min/dropzone.min.css');
    }
  },
};
