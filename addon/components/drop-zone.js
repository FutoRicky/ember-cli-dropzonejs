/* global Dropzone*/
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['dropzone'],

  myDropzone: document.body || undefined,

  dropzoneOptions: null,

  // Configuration Options

  url: '#',
  withCredentials: null,
  method: null,
  parallelUploads: null,
  maxFilesize: null,
  filesizeBase: null,
  paramName: null,
  uploadMultiple: null,
  headers: null,
  addRemoveLinks: null,
  previewsContainer: null,
  clickable: null,
  maxThumbnailFilesize: null,
  thumbnailWidth: null,
  thumbnailHeight: null,
  maxFiles: null,
  createImageThumbnails: null,

  //params hash
  params: null,

  // resize: not available
  acceptedFiles: null,
  autoProcessQueue: null,
  forceFallback: null,
  previewTemplate: null,

  // Dropzone translations
  dictDefaultMessage: null,
  dictFallbackMessage: null,
  dictFallbackText: null,
  dictInvalidFileType: null,
  dictFileTooBig: null,
  dictResponseError: null,
  dictCancelUpload: null,
  dictCancelUploadConfirmation: null,
  dictRemoveFile: null,
  dictMaxFilesExceeded: null,

  // Bonus for full screen zones
  maxDropRegion: null,

  // Events

  // All of these receive the event as first parameter:
  drop: null,
  dragstart: null,
  dragend: null,
  dragenter: null,
  dragover: null,
  dragleave: null,

  // All of these receive the file as first parameter:
  addedfile: null,
  removedfile: null,
  thumbnail: null,
  error: null,
  processing: null,
  uploadprogress: null,
  sending: null,
  success: null,
  complete: null,
  canceled: null,
  maxfilesreached: null,
  maxfilesexceeded: null,

  // All of these receive a list of files as first parameter and are only called if the uploadMultiple option is true:
  processingmultiple: null,
  sendingmultiple: null,
  successmultiple: null,
  completemultiple: null,
  canceledmultiple: null,

  // Special events:
  totaluploadprogress: null,
  reset: null,
  queuecomplete: null,
  files: null,

  // Callback functions
  accept: null,

  setEvents() {
    let myDropzone = this.get('myDropzone');
    let events = {
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
    };

    for (let e in events) {
      if (events[e] !== null) {
        myDropzone.on(e, events[e]);
      }
    }
  },

  getDropzoneOptions() {
    let dropzoneOptions = {};
    let dropzoneConfig = {
      url: this.url,
      withCredentials: this.withCredentials,
      method: this.method,
      parallelUploads: this.parallelUploads,
      maxFilesize: this.maxFilesize,
      filesizeBase: this.filesizeBase,
      paramName: this.paramName,
      uploadMultiple: this.uploadMultiple,
      headers: this.headers,
      addRemoveLinks: this.addRemoveLinks,
      previewsContainer: this.previewsContainer,
      clickable: this.clickable,
      maxThumbnailFilesize: this.maxThumbnailFilesize,
      thumbnailWidth: this.thumbnailWidth,
      thumbnailHeight: this.thumbnailHeight,
      maxFiles: this.maxFiles,
      createImageThumbnails: this.createImageThumbnails,
      params: this.params,

      // resize: not available
      acceptedFiles: this.acceptedFiles,
      autoProcessQueue: this.autoProcessQueue,
      forceFallback: this.forceFallback,
      previewTemplate: this.previewTemplate,

      // Dropzone translations
      dictDefaultMessage: this.dictDefaultMessage,
      dictFallbackMessage: this.dictFallbackMessage,
      dictFallbackText: this.dictFallbackText,
      dictInvalidFileType: this.dictInvalidFileType,
      dictFileTooBig: this.dictFileTooBig,
      dictResponseError: this.dictResponseError,
      dictCancelUpload: this.dictCancelUpload,
      dictCancelUploadConfirmation: this.dictCancelUploadConfirmation,
      dictRemoveFile: this.dictRemoveFile,
      dictMaxFilesExceeded: this.dictMaxFilesExceeded,

      // Fix flickering dragging over child elements: https://github.com/enyo/dropzone/issues/438
      init: function() {
        this.dragEnteredEls = [];
      },
      dragenter: function(e) {
        this.dragEnteredEls.push(e.target);
        Ember.$(this.element).addClass('dz-drag-hover');
      },
      dragleave: function(e) {
        this.dragEnteredEls = Ember.$(this.dragEnteredEls).not(e.target);
        if (this.dragEnteredEls.length === 0) {
          Ember.$(this.element).removeClass('dz-drag-hover');
        }
      },
    };

    for (let option in dropzoneConfig) {
      let data = dropzoneConfig[option];
      if (data !== null) {
        dropzoneOptions[option] = data;
      } else if (option === 'thumbnailHeight' || option === 'thumbnailWidth') {
        dropzoneOptions[option] = data;
      }
    }

    this.set('dropzoneOptions', dropzoneOptions);
  },

  createDropzone(element) {
    let region = this.get('maxDropRegion') ? document.body : element;
    this.set('myDropzone', new Dropzone(region, this.dropzoneOptions));
  },

  destroyDropzone: Ember.on('willDestroyElement', function() {
    this.get('myDropzone').destroy();
  }),

  insertDropzone: Ember.on('didInsertElement', function() {
    let _this = this;
    this.getDropzoneOptions();
    Dropzone.autoDiscover = false;
    this.createDropzone(this.element);
    //make sure events are set before any files are added
    this.setEvents();

    //this condition requires a fully resolved array to work
    //will not work with model.get('files') as it returns promise not array hence length condition is failed
    if (this.files && this.files.length > 0) {
      this.files.map(function(file) {
        let dropfile = {
          name: file.get('name'),
          type: file.get('type'),
          size: file.get('size'),
          status: Dropzone.ADDED,
          //add support for id  in files object so that it can be access in addedFile,removedFile callbacks for files identified by id
          id: file.get('id')
        };
        let thumbnail = file.get('thumbnail');

        if (typeof (thumbnail) === 'string') {
          dropfile.thumbnail = thumbnail;
        }

        _this.myDropzone.emit('addedfile', dropfile);

        if (typeof (thumbnail) === 'string') {

          _this.myDropzone.emit('thumbnail', dropfile, thumbnail);
        }

        _this.myDropzone.emit('complete', dropfile);
        _this.myDropzone.files.push(file);
      });
    }

    return this.myDropzone;
  }),
});
