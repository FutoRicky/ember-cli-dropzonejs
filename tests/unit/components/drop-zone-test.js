import { moduleForComponent, test } from 'ember-qunit';
import { run } from '@ember/runloop';

moduleForComponent('drop-zone', 'Unit | Component | drop zone', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true,
});

function stringGenerator(len) {
  let text = ' ';
  let charset = 'abcdefghijklmnopqrstuvwxyz 0123456789';

  for (let i = 0; i < len; i++) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return text;
}

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  let component = this.subject();
  component.set('url', '#');
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('that is being initialized', function(assert) {
  let component = this.subject();
  component.set('url', '#');
  this.render();
  run(() => {
    assert.ok(component.myDropzone);
  });
});

test('that options are being assigned properly', function(assert) {
  let component = this.subject();

  // not tested:
  // previewsContainer
  // acceptedFiles
  // forceFallback
  //
  let urlArr = ['#', 'http://example.com/example', '/here/inside'];
  component.set('url', urlArr[Math.floor(Math.random() * urlArr.length)]);

  component.set('timeout', 50000);

  let methodArr = ['POST', 'GET'];
  component.set('method', methodArr[Math.floor(Math.random() * methodArr.length)]);

  component.set('parallelUploads', Math.floor(Math.random() * 16));

  component.set('maxFilesize', Math.floor(Math.random() * 10000));

  let filesizeBaseArr = [1000, 1024];
  component.set('filesizeBase', filesizeBaseArr[Math.floor(Math.random() * filesizeBaseArr.length)]);

  let paramNameArr = ['file', 'testing', '12345', '#*Ewefw9e77ef'];
  component.set('paramName', paramNameArr[Math.floor(Math.random() * paramNameArr.length)]);

  component.set('uploadMultiple', Boolean(Math.floor(Math.random() * 2)));

  let headersArr = [undefined, { auth: stringGenerator(20) }];
  component.set('headers', headersArr[Math.floor(Math.random() * headersArr.length)]);

  component.set('addRemoveLinks', Boolean(Math.floor(Math.random() * 2)));

  let bool = Boolean(Math.floor(Math.random() * 2));
  component.set('clickable', bool);


  component.set('maxThumbnailFilesize', Math.floor(Math.random() * 10000));

  component.set('thumbnailWidth', Math.floor(Math.random() * 10000));

  component.set('thumbnailHeight', Math.floor(Math.random() * 10000));

  let maxFilesArr = [null, Math.floor(Math.random() * 10000)];
  component.set('maxFiles', maxFilesArr[Math.floor(Math.random() * maxFilesArr.length)]);

  component.set('autoProccessQueue', Boolean(Math.floor(Math.random() * 2)));

  this.render();

  run(() => {
    let dropOption = component.myDropzone.options;
    assert.equal(component.url, dropOption.url, 'URL');
    assert.equal(component.method, dropOption.method, 'Method');
    assert.equal(component.timeout, dropOption.timeout, 'timeout');
    assert.equal(component.parallelUploads, dropOption.parallelUploads, 'parallelUploads');
    assert.equal(component.maxFilesize, dropOption.maxFilesize, 'max filesize');
    assert.equal(component.filesizeBase, dropOption.filesizeBase, 'filesizeBase');
    assert.equal(component.paramNameArr, dropOption.paramNameArr, 'paramNameArr');
    assert.equal(component.uploadMultiple, dropOption.uploadMultiple, 'uploadMultiple');
    assert.equal(component.headers, dropOption.headers, 'headers');
    assert.equal(component.addRemoveLinks, dropOption.addRemoveLinks, 'addRemoveLinks');
    assert.equal(component.get('clickable'), dropOption.clickable, 'clickable');
    assert.equal(component.maxThumbnailFilesize, dropOption.maxThumbnailFilesize, 'maxThumbnailFilesize');
    assert.equal(component.thumbnailWidth, dropOption.thumbnailWidth, 'thumbnailWidth');
    assert.equal(component.thumbnailHeight, dropOption.thumbnailHeight, 'thumbnailHeight');
    assert.equal(component.maxFiles, dropOption.maxFiles, 'maxFiles');

  });

});

test('that translations are being set', function(assert) {
  let component = this.subject();
  component.set('url', '#');
  component.set('dictDefaultMessage', stringGenerator(Math.floor(Math.random() * 100)));
  component.set('dictFallbackMessage', stringGenerator(Math.floor(Math.random() * 100)));
  component.set('dictFallbackText', stringGenerator(Math.floor(Math.random() * 100)));
  component.set('dictInvalidFileType', stringGenerator(Math.floor(Math.random() * 100)));
  component.set('dictFileTooBig', stringGenerator(Math.floor(Math.random() * 100)));
  component.set('dictResponseError', stringGenerator(Math.floor(Math.random() * 100)));
  component.set('dictCancelUpload', stringGenerator(Math.floor(Math.random() * 100)));
  component.set('dictCancelUploadConfirmation', stringGenerator(Math.floor(Math.random() * 100)));
  component.set('dictRemoveFile', stringGenerator(Math.floor(Math.random() * 100)));
  component.set('dictMaxFilesExceeded', stringGenerator(Math.floor(Math.random() * 100)));

  this.render();

  run(() => {
    let dropTranslations = component.myDropzone.options;
    assert.equal(component.dictDefaultMessage, dropTranslations.dictDefaultMessage);
    assert.equal(component.dictFallbackMessage, dropTranslations.dictFallbackMessage);
    assert.equal(component.dictFallbackText, dropTranslations.dictFallbackText);
    assert.equal(component.dictInvalidFileType, dropTranslations.dictInvalidFileType);
    assert.equal(component.dictFileTooBig, dropTranslations.dictFileTooBig);
    assert.equal(component.dictResponseError, dropTranslations.dictResponseError);
    assert.equal(component.dictCancelUpload, dropTranslations.dictCancelUpload);
    assert.equal(component.dictCancelUploadConfirmation, dropTranslations.dictCancelUploadConfirmation);
    assert.equal(component.dictRemoveFile, dropTranslations.dictRemoveFile);
    assert.equal(component.dictMaxFilesExceeded, dropTranslations.dictMaxFilesExceeded);

  });
});

test('that options hash works with set properties', function (assert) {
  let component = this.subject();
  let optionsHash = {
    url: 'fakeURL',
    method: 'GET',
    maxFiles: 4,
    params: {
      thingOne: 1,
      thingTwo: 2
    }
  };

  component.set('config', optionsHash);
  this.render();
  run(() => {
    let dropOption = component.myDropzone.options;

    assert.equal(optionsHash.url, dropOption.url, 'url');
    assert.equal(optionsHash.method, dropOption.method, 'method');
    assert.equal(optionsHash.maxFiles, dropOption.maxFiles, 'maxFiles');
    assert.equal(optionsHash.params, dropOption.params, 'params')
  })

});
