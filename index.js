/* eslint-env node */
'use strict';

var path = require('path');
var MergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-cli-dropzonejs',

  treeForVendor(vendorTree) {
    var dropzoneJs = new Funnel(
      path.join(this.project.root, 'node_modules', 'dropzone/dist/min'),
      { files: ['dropzone.min.js'] }
    );

    dropzoneJs = map(
      dropzoneJs,
      content => `if (typeof FastBoot === 'undefined') { ${content} }`
    );

    return new MergeTrees(vendorTree, dropzoneJs);
  },

  treeForStyles(styleTree) {
    var dropzoneCss = new Funnel(
      path.join(this.project.root, 'node_modules', 'dropzone/dist/min'),
      {
        files: ['dropzone.min.css'],
        destDir: 'app/styles'
      }
    );

    return new MergeTrees(styleTree, dropzoneCss);
  },

  included() {
    this.import('vendor/dropzone.min.js');
    this.import('app/styles/dropzone.min.css');
  }
};
