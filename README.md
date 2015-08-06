# Ember-cli-dropzonejs

Drag and drop file uploader addon for ember-cli using [Dropzonejs](http://www.dropzonejs.com/).

Installation
-------------
`ember install ember-cli-dropzonejs`

then 

`bower install dropzone`

Usage
-------------
Simply add the component to your template like so: `{{drop-zone url='/endpoint'}}`

You can see all properties in the [Dropzonejs configuration docs](http://www.dropzonejs.com/#configuration).

To set properties simply add the name of the property inside the component call and assign a value.

example:

`{{drop-zone url='http://example.com/example' clickable=false addRemoveLinks=true}}`

**Remember to add an url, it will not work without it**

Demo
-------------
[DEMO](http://www.dropzonejs.com/examples/simple.html)
