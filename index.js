/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-cli-dropzonejs',

  treeForVendor(vendorTree) {
    return new MergeTrees([
      vendorTree,
      new Funnel(
        path.join(this.project.root, 'node_modules', 'dropzone/dist/min'),
        {
          files: ['dropzone.min.css']
        }
      ),
      map(
        new Funnel(
          path.join(this.project.root, 'node_modules', 'dropzone/dist/min'),
          {
            files: ['dropzone.min.js']
          }
        ),
        content => `if (typeof FastBoot === 'undefined') { ${content} }`
      )
    ]);
  },

  included() {
    this.import('vendor/dropzone.min.js');
    this.import('vendor/dropzone.min.css');
  }
};
