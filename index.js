/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-dropzonejs',
  included() {
    this._super.included.apply(this, arguments);
    this.import('vendor/dropzone.min.js');
    this.import('vendor/dropzone.min.css');
  },
  treeForVendor(vendorTree) {
    var dropzoneTree = new Funnel(
      path.join(this.project.root, 'node_modules', 'dropzone/dist/min'),
      {
        files: ['dropzone.min.js', 'dropzone.min.css']
      }
    );

    return new MergeTrees([vendorTree, dropzoneTree]);
  }
};
