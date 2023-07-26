/* eslint-disable node/no-unpublished-require */
/* eslint-env node */
/* jshint node: true */
'use strict';

var path = require('path');
var MergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var map = require('broccoli-stew').map;

module.exports = {
  name: '@volldigital/ember-cli-dropzonejs',

  treeForVendor(vendorTree) {
    var dropzoneJs = new Funnel(
      path.join(this.project.root, 'node_modules', 'dropzone/dist/min'),
      { files: ['dropzone.min.js'] }
    );

    dropzoneJs = map(
      dropzoneJs,
      (content) => `if (typeof FastBoot === 'undefined') { ${content} }`
    );

    return vendorTree ? new MergeTrees([vendorTree, dropzoneJs]) : dropzoneJs;
  },

  treeForStyles(styleTree) {
    var dropzoneCss = new Funnel(
      path.join(this.project.root, 'node_modules', 'dropzone/dist/min'),
      {
        files: ['dropzone.min.css'],
        destDir: 'app/styles',
      }
    );

    return styleTree ? new MergeTrees([styleTree, dropzoneCss]) : dropzoneCss;
  },

  included(app) {
    this._super.included.apply(this, arguments);
    let options = app.options.emberCliDropzonejs || {
      includeDropzoneCss: true,
    };

    this.import('vendor/dropzone.min.js');

    if (options.includeDropzoneCss) {
      this.import('app/styles/dropzone.min.css');
    }
  },
};
