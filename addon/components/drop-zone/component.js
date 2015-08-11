/* global Dropzone*/
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['dropzone'],

  myDropzone:undefined,

  dropzoneOptions: null,

  url: '#',
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
  maxThumbnailsize: null,
  thumbnailWidth: null,
  thumbnailHeight: null,
  maxFiles: null,
  // resize
  acceptedFiles: null,
  autoProcessQueue: null,
  forceFallback: null,

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
  maxfilesexceeded : null,
  // All of these receive a list of files as first parameter and are only called if the uploadMultiple option is true:
  processingmultiple: null,
  sendingmultiple: null,
  successmultiple: null,
  completemultiple: null,
  canceledmultiple: null, 
  //Special events:
  totaluploadprogress: null,
  reset: null,
  queuecomplete: null,

  getDropzoneOptions(){
    let dropzoneOptions = {};
    let dropzoneKeys = [
      "url",
      "method",
      "parallelUploads",
      "maxFilesize",
      "filesizeBase", 
      "paramName",
      "uploadMultiple",
      "headers",
      "addRemoveLinks",
      "previewsContainer",
      "clickable",
      "maxThumbnailsize",
      "thumbnailWidth",
      "thumbnailHeight",
      "maxFiles",
      "acceptedFiles",
      "autoProcessQueue",
      "forceFallback",
      "dictDefaultMessage",
      "dictFallbackMessage",
      "dictFallbackText",
      "dictInvalidFileType",
      "dictFileTooBig",
      "dictResponseError",
      "dictCancelUpload",
      "dictCancelUploadConfirmation",
      "dictRemoveFile",
      "dictMaxFilesExceeded",
      "drop",
      "dragstart",
      "dragend",
      "dragenter",
      "dragover",
      "dragleave",
      "addedfile",
      "removedfile",
      "thumbnail",
      "error",
      "processing",
      "uploadprogress",
      "sending",
      "success",
      "complete",
      "canceled",
      "maxfilesreached",
      "maxfilesexceeded", 
      "processingmultiple",
      "sendingmultiple",
      "successmultiple",
      "completemultiple",
      "canceledmultiple",
      "totaluploadprogress",
      "reset",
      "queuecomplete"
    ];
    let dropzoneProperties = [
      this.url,
      this.method,
      this.parallelUploads,
      this.maxFilesize,
      this.filesizeBase,
      this.paramName,
      this.uploadMultiple,
      this.headers,
      this.addRemoveLinks,
      this.previewsContainer,
      this.clickable,
      this.maxThumbnailsize, 
      this.thumbnailWidth,
      this.thumbnailHeight,
      this.maxFiles,
      // resize
      this.acceptedFiles,
      this.autoProcessQueue,
      this.forceFallback,

      // Dropzone translations
      this.dictDefaultMessage,
      this.dictFallbackMessage,
      this.dictFallbackText,
      this.dictInvalidFileType,
      this.dictFileTooBig,
      this.dictResponseError,
      this.dictCancelUpload,
      this.dictCancelUploadConfirmation,
      this.dictRemoveFile,
      this.dictMaxFilesExceeded,

      // Events

      // All of these receive the event as first parameter:
      this.drop,
      this.dragstart,
      this.dragend,
      this.dragenter,
      this.dragover,  
      this.dragleave,
      // All of these receive the file as first parameter:
      this.addedfile,
      this.removedfile,
      this.thumbnail,
      this.error,
      this.processing,
      this.uploadprogress,
      this.sending,
      this.success, 
      this.complete,
      this.canceled,
      this.maxfilesreached,
      this.maxfilesexceeded,
      // All of these receive a list of files as first parameter and are only called if the uploadMultiple option is true:
      this.processingmultiple,
      this.sendingmultiple,
      this.successmultiple,
      this.completemultiple,
      this.canceledmultiple, 
      //Special events:
      this.totaluploadprogress,
      this.reset,
      this.queuecomplete
    ];

    for( let i=0; i < dropzoneProperties.length; i++ ){
      if(dropzoneProperties[i] !== null){
        dropzoneOptions[dropzoneKeys[i]] = dropzoneProperties[i];
      }
    }
    this.set('dropzoneOptions', dropzoneOptions);
  },

  createDropzone(element){
    this.set('myDropzone', new Dropzone(element, this.dropzoneOptions));
  },

  insertDropzone: Ember.on('didInsertElement', function(){
    this.getDropzoneOptions();
    Dropzone.autoDiscover = false;
    this.createDropzone('div.dropzone');
    return this.myDropzone;
  })
});
