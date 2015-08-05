/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-dropzonejs',
  included: function(app) {
    this._super.included(app);

    app.import('bower_components/dropzone/dist/dropzone.js');
    app.import('bower_components/dropzone/dist/dropzone.css');
  }
};
