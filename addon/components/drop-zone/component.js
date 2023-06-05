import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

export default class DropZoneComponent extends Component {
  @tracked _myDropzone;
  @tracked _dropzoneOptions;

  get myDropzone() {
    if (this._myDropzone) return this._myDropzone;

    return typeof FastBoot === 'undefined' ? document.body : undefined;
  }

  set myDropzone(value) {
    this._myDropzone = value;
  }

  get dropzoneOptions() {
    return this._dropzoneOptions ?? null;
  }

  set dropzoneOptions(value) {
    this._dropzoneOptions = value;
  }

  get dzOptionsList() {
    return [
      'url',
      'withCredentials',
      'method',
      'parallelUploads',
      'maxFilesize',
      'filesizeBase',
      'paramName',
      'uploadMultiple',
      'headers',
      'addRemoveLinks',
      'previewsContainer',
      'clickable',
      'maxThumbnailFilesize',
      'thumbnailWidth',
      'thumbnailHeight',
      'maxFiles',
      'createImageThumbnails',
      'params',
      'acceptedFiles',
      'autoProcessQueue',
      'forceFallback',
      'previewTemplate',
      'dictDefaultMessage',
      'dictFallbackMessage',
      'dictInvalidFileType',
      'dictFallbackText',
      'dictFileTooBig',
      'dictResponseError',
      'dictCancelUpload',
      'timeout',
      'dictCancelUploadConfirmation',
      'dictRemoveFile',
      'dictMaxFilesExceeded',
      'maxDropRegion',
      'dictUploadCanceled',
      'dictRemoveFileConfirmation',
      'dictFileSizeUnits',
    ];
  }

  get config() {
    return this.args.config || {};
  }

  get url() {
    return this.args.url;
  }
  get withCredentials() {
    return this.args.withCredentials;
  }
  get method() {
    return this.args.method;
  }
  get parallelUploads() {
    return this.args.parallelUploads;
  }
  get maxFilesize() {
    return this.args.maxFilesize;
  }
  get filesizeBase() {
    return this.args.filesizeBase;
  }
  get paramName() {
    return this.args.paramName;
  }
  get uploadMultiple() {
    return this.args.uploadMultiple;
  }
  get headers() {
    return this.args.headers ?? null;
  }
  get addRemoveLinks() {
    return this.args.addRemoveLinks;
  }
  get previewsContainer() {
    return this.args.previewsContainer;
  }
  get clickable() {
    return this.args.clickable;
  }
  get maxThumbnailFilesize() {
    return this.args.maxThumbnailFilesize;
  }
  get maxFiles() {
    return this.args.maxFiles;
  }
  get createImageThumbnails() {
    return this.args.createImageThumbnails;
  }
  get params() {
    return this.args.params;
  }
  get acceptedFiles() {
    return this.args.acceptedFiles;
  }
  get forceFallback() {
    return this.args.forceFallback;
  }
  get dictDefaultMessage() {
    return this.args.dictDefaultMessage;
  }
  get dictFallbackMessage() {
    return this.args.dictFallbackMessage;
  }
  get dictInvalidFileType() {
    return this.args.dictInvalidFileType;
  }
  get dictFallbackText() {
    return this.args.dictFallbackText;
  }
  get dictFileTooBig() {
    return this.args.dictFileTooBig;
  }
  get dictResponseError() {
    return this.args.dictResponseError;
  }
  get dictCancelUpload() {
    return this.args.dictCancelUpload;
  }
  get timeout() {
    return this.args.timeout;
  }
  get dictCancelUploadConfirmation() {
    return this.args.dictCancelUploadConfirmation;
  }
  get dictRemoveFile() {
    return this.args.dictRemoveFile;
  }
  get dictMaxFilesExceeded() {
    return this.args.dictMaxFilesExceeded;
  }
  get maxDropRegion() {
    return this.args.maxDropRegion;
  }
  get dictUploadCanceled() {
    return this.args.dictUploadCanceled;
  }
  get dictRemoveFileConfirmation() {
    return this.args.dictRemoveFileConfirmation;
  }
  get dictFileSizeUnits() {
    return this.args.dictFileSizeUnits;
  }

  // Need to preserve null default values
  get thumbnailHeight() {
    return this.args.thumbnailHeight ?? null;
  }

  get thumbnailWidth() {
    return this.args.thumbnailWidth ?? null;
  }

  // Events
  // All of these receive the event as first parameter:
  get drop() {
    return this.args.drop ?? null;
  }
  get dragstart() {
    return this.args.dragstart ?? null;
  }
  get dragend() {
    return this.args.dragend ?? null;
  }
  get dragleave() {
    return this.args.dragleave ?? null;
  }

  //noops
  get dragenter() {
    return this.args.dragenter || (() => {});
  }
  get dragover() {
    return this.args.dragover || (() => {});
  }

  // All of these receive the file as first parameter:
  get addedfile() {
    return this.args.addedfile ?? null;
  }
  get removedfile() {
    return this.args.removedfile ?? null;
  }
  get thumbnail() {
    return this.args.thumbnail ?? null;
  }
  get error() {
    return this.args.error ?? null;
  }
  get processing() {
    return this.args.processing ?? null;
  }
  get uploadprogress() {
    return this.args.uploadprogress ?? null;
  }
  get sending() {
    return this.args.sending ?? null;
  }
  get success() {
    return this.args.success ?? null;
  }
  get complete() {
    return this.args.complete ?? null;
  }
  get canceled() {
    return this.args.canceled ?? null;
  }
  get maxfilesreached() {
    return this.args.maxfilesreached ?? null;
  }
  get maxfilesexceeded() {
    return this.args.maxfilesexceeded ?? null;
  }

  // All of these receive a list of files as first parameter and are only called if the uploadMultiple option is true:
  get processingmultiple() {
    return this.args.processingmultiple ?? null;
  }
  get sendingmultiple() {
    return this.args.sendingmultiple ?? null;
  }
  get successmultiple() {
    return this.args.successmultiple ?? null;
  }
  get completemultiple() {
    return this.args.completemultiple ?? null;
  }
  get canceledmultiple() {
    return this.args.canceledmultiple ?? null;
  }

  // Special events:
  get totaluploadprogress() {
    return this.args.totaluploadprogress ?? null;
  }
  get reset() {
    return this.args.reset ?? null;
  }
  get queuecomplete() {
    return this.args.queuecomplete ?? null;
  }
  get files() {
    return this.args.files ?? null;
  }

  // Callback functions
  get accept() {
    return this.args.accept ?? null;
  }

  setEvents() {
    const { myDropzone } = this;
    const events = {
      drop: this.drop,
      dragstart: this.dragstart,
      dragend: this.dragend,
      dragenter: this.dragenter,
      dragover: this.dragover,
      dragleave: this.dragleave,
      addedfile: this.addedfile,
      removedfile: this.removedfile,
      thumbnail: this.thumbnail,
      error: this.error,
      processing: this.processing,
      uploadprogress: this.uploadprogress,
      sending: this.sending,
      success: this.success,
      complete: this.complete,
      canceled: this.canceled,
      maxfilesreached: this.maxfilesreached,
      maxfilesexceeded: this.maxfilesexceeded,
      processingmultiple: this.processingmultiple,
      sendingmultiple: this.sendingmultiple,
      successmultiple: this.successmultiple,
      completemultiple: this.completemultiple,
      canceledmultiple: this.canceledmultiple,
      totaluploadprogress: this.totaluploadprogress,
      reset: this.reset,
      queuecomplete: this.queuecomplete,
      files: this.files,
      accept: this.accept,
      renameFile: this.renameFile,
    };

    for (let e in events) {
      if (events[e] !== null) {
        myDropzone.on(e, events[e]);
      }
    }
  }

  get _dzConfig() {
    const { config } = this,
      optList = this.dzOptionsList,
      output = {};

    optList.forEach((e) => {
      // use dynamic hash first
      // eslint-disable-next-line no-prototype-builtins
      if (config.hasOwnProperty(e)) {
        output[e] = config[e];
      }

      // if property is set specifically, override
      if (this[e] != null) {
        output[e] = this[e];
      }

      // need to set null versions of thumbnail width / height
      if (e === 'thumbnailHeight' || e === 'thumbnailWidth') {
        output[e] = this[e];
      }
    });

    assert('Url is required for dropzone', output.url);
    // Preserve defaults for existing apps/tests
    if (!output.url) {
      output.url = '#';
    }

    return output;
  }

  getDropzoneOptions() {
    const onDragEnterLeaveHandler = function (dropzoneInstance) {
      const onDrag = ((element) => {
        let dragEnteredEls = [];

        return {
          enter(event) {
            dragEnteredEls.push(event.target);
            element.classList.add('dz-drag-hover');
          },
          leave(event) {
            dragEnteredEls = dragEnteredEls.filter((el) => {
              return el !== event.target;
            });

            if (dragEnteredEls.length === 0) {
              element.classList.remove('dz-drag-hover');
            }
          },
        };
      }).call(this, dropzoneInstance.element);

      dropzoneInstance.on('dragenter', onDrag.enter);
      dropzoneInstance.on('dragleave', onDrag.leave);
    };

    const config = this._dzConfig;

    // these events will be overwritten
    config.dragenter = function () {};
    config.dragleave = function () {};

    config.init = function () {
      onDragEnterLeaveHandler(this);
    };

    this.dropzoneOptions = config;
  }

  createDropzone(element) {
    const region =
      this.maxDropRegion && typeof FastBoot === 'undefined'
        ? document.body
        : element;
    this.myDropzone = new Dropzone(region, this.dropzoneOptions);
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.myDropzone.destroy();
  }

  @action
  didInsert(element) {
    this.getDropzoneOptions();

    Dropzone.autoDiscover = false;
    this.createDropzone(element);
    //make sure events are set before any files are added
    this.setEvents();

    //this condition requires a fully resolved array to work
    //will not work with model.get('files') as it returns promise not array hence length condition is failed
    if (this.files && this.files.length > 0) {
      this.files.map((file) => {
        const dropfile = {
          name: file.get('name'),
          type: file.get('type'),
          size: file.get('size'),
          status: Dropzone.ADDED,
          //add support for id  in files object so that it can be access in addedFile,removedFile callbacks for files identified by id
          id: file.get('id'),
        };
        const thumbnail = file.get('thumbnail');

        if (typeof thumbnail === 'string') {
          dropfile.thumbnail = thumbnail;
        }

        this.myDropzone.emit('addedfile', dropfile);

        if (typeof thumbnail === 'string') {
          this.myDropzone.emit('thumbnail', dropfile, thumbnail);
        }

        this.myDropzone.emit('complete', dropfile);
        this.myDropzone.files.push(file);
      });
    }

    return this.myDropzone;
  }
}
