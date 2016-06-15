/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-dropzonejs',
  included: function(app) {
    this._super.included(app);

    var options = app.options.emberCliDropzonejs || {includeDropzoneCss: true};

    app.import(app.bowerDirectory + '/dropzone/dist/dropzone.js');

    if (options.includeDropzoneCss){
      app.import(app.bowerDirectory + '/dropzone/dist/dropzone.css');
    }

  }
};
