/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-dropzonejs',
  included: function(app) {
    this._super.included(app);

    var options = app.options.emberCliDropzonejs || {includeDropzoneCss: true};

    app.import('bower_components/dropzone/dist/dropzone.js');

    if (options.includeDropzoneCss){
      app.import('bower_components/dropzone/dist/dropzone.css');
    }

  }
};
