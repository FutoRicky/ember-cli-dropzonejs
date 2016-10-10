# Ember-cli-dropzonejs
[![Build Status](https://travis-ci.org/FutoRicky/ember-cli-dropzonejs.svg?branch=test%2Ftarvis-ci-implementation)](https://travis-ci.org/FutoRicky/ember-cli-dropzonejs)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-dropzonejs.svg)](https://emberobserver.com/addons/ember-cli-dropzonejs)

Drag and drop file uploader addon for ember-cli using [Dropzonejs](http://www.dropzonejs.com/).

[DEMO](http://futoricky.github.io/ember-cli-dropzonejs/)

Versions
-------------
Current version is running ember-cli >= `2.8.0`

Versions 0.8.6 <= are running ember-cli `1.13.8` 


Installation
-------------
`ember install ember-cli-dropzonejs`

This addon will use dropzone's default css by default. If you prefer to use your own css, add this option to your `Brocfile.js`:

```javascript
var app = new EmberApp({
  ---
  emberCliDropzonejs: {
    includeDropzoneCss: false
  }
  ---
});
```


Usage
-------------
Simply add the component to your template like so: `{{drop-zone url='/endpoint'}}`

You can see all properties in the [Dropzonejs configuration docs](http://www.dropzonejs.com/#configuration).

To set properties simply add the name of the property inside the component call and assign a value.

example:

`{{drop-zone url='http://example.com/example' clickable=false addRemoveLinks=true}}`

####Event Handling
[Dropzonejs Events Docs](http://www.dropzonejs.com/#events)


To use events, set your event handler in your controller like so:

```
  addedFileEvent: Ember.computed(function() {
    return function() {
      // do something...
    };
  }),
```

and set it in your component declaration:

`{{drop-zone url='http://example.com/example' addfile=addedFileEvent}}`

**Remember to add an url, this addon will not work without it**

Contributions
-------------

All contributions are welcomed and encouraged.

Please make all pull requests to the `dev` branch.

Thanks!
