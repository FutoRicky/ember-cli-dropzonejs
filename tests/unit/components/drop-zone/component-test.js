import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

function stringGenerator(len) {
  let text = ' ';
  let charset = 'abcdefghijklmnopqrstuvwxyz 0123456789';

  for (let i = 0; i < len; i++) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return text;
}

async function renderComponent(component) {
  await render(hbs`<div class="dropzone"></div>`);
  component.didInsert(find('.dropzone'));
}

module('Unit | Component | drop zone', function (hooks) {
  setupRenderingTest(hooks);

  test('that is being initialized', async function (assert) {
    const { class: Component } = this.owner.factoryFor('component:drop-zone');
    const componentManager = this.owner.lookup('component-manager:glimmer');
    const component = componentManager.createComponent(Component, {
      named: {
        url: '#',
      },
    });

    await renderComponent(component);

    assert.ok(component.myDropzone);
  });

  test('that options are being assigned properly', async function (assert) {
    const { class: Component } = this.owner.factoryFor('component:drop-zone');
    const componentManager = this.owner.lookup('component-manager:glimmer');
    // not tested:
    // previewsContainer
    // acceptedFiles
    // forceFallback
    //
    const urlArr = ['#', 'http://example.com/example', '/here/inside'];
    const url = urlArr[Math.floor(Math.random() * urlArr.length)];
    const timeout = 50000;

    const methodArr = ['POST', 'GET'];
    const method = methodArr[Math.floor(Math.random() * methodArr.length)];
    const parallelUploads = Math.floor(Math.random() * 16);
    const maxFilesize = Math.floor(Math.random() * 10000);
    const filesizeBaseArr = [1000, 1024];
    const filesizeBase =
      filesizeBaseArr[Math.floor(Math.random() * filesizeBaseArr.length)];
    const paramNameArr = ['file', 'testing', '12345', '#*Ewefw9e77ef'];
    const paramName =
      paramNameArr[Math.floor(Math.random() * paramNameArr.length)];
    const uploadMultiple = Boolean(Math.floor(Math.random() * 2));
    const headersArr = [undefined, { auth: stringGenerator(20) }];
    const headers = headersArr[Math.floor(Math.random() * headersArr.length)];
    const addRemoveLinks = Boolean(Math.floor(Math.random() * 2));
    const bool = Boolean(Math.floor(Math.random() * 2));
    const clickable = bool;
    const maxThumbnailFilesize = Math.floor(Math.random() * 10000);
    const thumbnailWidth = Math.floor(Math.random() * 10000);
    const thumbnailHeight = Math.floor(Math.random() * 10000);
    const maxFilesArr = [null, Math.floor(Math.random() * 10000)];
    const maxFiles =
      maxFilesArr[Math.floor(Math.random() * maxFilesArr.length)];
    const autoProccessQueue = Boolean(Math.floor(Math.random() * 2));

    const component = componentManager.createComponent(Component, {
      named: {
        url,
        timeout,
        method,
        parallelUploads,
        maxFilesize,
        filesizeBase,
        paramName,
        uploadMultiple,
        headers,
        addRemoveLinks,
        clickable,
        maxThumbnailFilesize,
        thumbnailWidth,
        thumbnailHeight,
        maxFiles,
        autoProccessQueue,
      },
    });

    await renderComponent(component);

    const dropOption = component.myDropzone.options;
    assert.strictEqual(component.url, dropOption.url, 'URL');
    assert.strictEqual(component.method, dropOption.method, 'Method');
    assert.strictEqual(component.timeout, dropOption.timeout, 'timeout');
    assert.strictEqual(
      component.parallelUploads,
      dropOption.parallelUploads,
      'parallelUploads'
    );
    assert.strictEqual(
      component.maxFilesize,
      dropOption.maxFilesize,
      'max filesize'
    );
    assert.strictEqual(
      component.filesizeBase,
      dropOption.filesizeBase,
      'filesizeBase'
    );
    assert.strictEqual(
      component.paramNameArr,
      dropOption.paramNameArr,
      'paramNameArr'
    );
    assert.strictEqual(
      component.uploadMultiple,
      dropOption.uploadMultiple,
      'uploadMultiple'
    );
    assert.strictEqual(component.headers, dropOption.headers, 'headers');
    assert.strictEqual(
      component.addRemoveLinks,
      dropOption.addRemoveLinks,
      'addRemoveLinks'
    );
    assert.strictEqual(component.clickable, dropOption.clickable, 'clickable');
    assert.strictEqual(
      component.maxThumbnailFilesize,
      dropOption.maxThumbnailFilesize,
      'maxThumbnailFilesize'
    );
    assert.strictEqual(
      component.thumbnailWidth,
      dropOption.thumbnailWidth,
      'thumbnailWidth'
    );
    assert.strictEqual(
      component.thumbnailHeight,
      dropOption.thumbnailHeight,
      'thumbnailHeight'
    );
    assert.strictEqual(component.maxFiles, dropOption.maxFiles, 'maxFiles');
  });

  test('that translations are being set', async function (assert) {
    const { class: Component } = this.owner.factoryFor('component:drop-zone');
    const componentManager = this.owner.lookup('component-manager:glimmer');

    const url = '#';
    const dictDefaultMessage = stringGenerator(Math.floor(Math.random() * 100));
    const dictFallbackMessage = stringGenerator(
      Math.floor(Math.random() * 100)
    );
    const dictFallbackText = stringGenerator(Math.floor(Math.random() * 100));
    const dictInvalidFileType = stringGenerator(
      Math.floor(Math.random() * 100)
    );
    const dictFileTooBig = stringGenerator(Math.floor(Math.random() * 100));
    const dictResponseError = stringGenerator(Math.floor(Math.random() * 100));
    const dictCancelUpload = stringGenerator(Math.floor(Math.random() * 100));
    const dictCancelUploadConfirmation = stringGenerator(
      Math.floor(Math.random() * 100)
    );
    const dictRemoveFile = stringGenerator(Math.floor(Math.random() * 100));
    const dictMaxFilesExceeded = stringGenerator(
      Math.floor(Math.random() * 100)
    );

    const component = componentManager.createComponent(Component, {
      named: {
        url,
        dictDefaultMessage,
        dictFallbackMessage,
        dictFallbackText,
        dictInvalidFileType,
        dictFileTooBig,
        dictResponseError,
        dictCancelUpload,
        dictCancelUploadConfirmation,
        dictRemoveFile,
        dictMaxFilesExceeded,
      },
    });

    await renderComponent(component);

    const dropTranslations = component.myDropzone.options;
    assert.strictEqual(
      component.dictDefaultMessage,
      dropTranslations.dictDefaultMessage
    );
    assert.strictEqual(
      component.dictFallbackMessage,
      dropTranslations.dictFallbackMessage
    );
    assert.strictEqual(
      component.dictFallbackText,
      dropTranslations.dictFallbackText
    );
    assert.strictEqual(
      component.dictInvalidFileType,
      dropTranslations.dictInvalidFileType
    );
    assert.strictEqual(
      component.dictFileTooBig,
      dropTranslations.dictFileTooBig
    );
    assert.strictEqual(
      component.dictResponseError,
      dropTranslations.dictResponseError
    );
    assert.strictEqual(
      component.dictCancelUpload,
      dropTranslations.dictCancelUpload
    );
    assert.strictEqual(
      component.dictCancelUploadConfirmation,
      dropTranslations.dictCancelUploadConfirmation
    );
    assert.strictEqual(
      component.dictRemoveFile,
      dropTranslations.dictRemoveFile
    );
    assert.strictEqual(
      component.dictMaxFilesExceeded,
      dropTranslations.dictMaxFilesExceeded
    );
  });

  test('that options hash works with set properties', async function (assert) {
    const { class: Component } = this.owner.factoryFor('component:drop-zone');
    const componentManager = this.owner.lookup('component-manager:glimmer');

    const optionsHash = {
      url: 'fakeURL',
      method: 'GET',
      maxFiles: 4,
      params: {
        thingOne: 1,
        thingTwo: 2,
      },
    };

    const component = componentManager.createComponent(Component, {
      named: {
        config: optionsHash,
      },
    });

    await renderComponent(component);

    const dropOption = component.myDropzone.options;

    assert.strictEqual(optionsHash.url, dropOption.url, 'url');
    assert.strictEqual(optionsHash.method, dropOption.method, 'method');
    assert.strictEqual(optionsHash.maxFiles, dropOption.maxFiles, 'maxFiles');
    assert.strictEqual(optionsHash.params, dropOption.params, 'params');
  });
});
