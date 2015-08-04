/* global Dropzone*/
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['dropzone'],

  myDropzone:undefined,
  url: '#',
  method: "post",
  parallelUploads: 2,
  maxFilesize: 256,
  filesizeBase: 1000,
  paramName: 'file',
  uploadMultiple: false,
  headers:undefined,
  addremoveLinks: false,
  previewsContainer: null,
  clickable: true,
  maxThumbnailsize: 10, 
  thumbnailWidth: 120,
  thumbnailHeight: 120,
  maxFiles: null,
  // resize
  acceptedFiles: null,
  autoProccessQueue: true,
  forceFallback: false,

  // Dropzone translations
  dictDefaultMessage: "Drop files here to upload",
  dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
  dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
  dictInvalidFileType: "You can't upload files of this type.",
  dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
  dictResponseError: "Server responded with {{statusCode}} code.",
  dictCancelUpload: "Cancel upload",
  dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?" ,
  dictRemoveFile: "Remove file",
  dictMaxFilesExceeded: "You can not upload any more files.",

  // Events

  // All of these receive the event as first parameter:
  drop: undefined,
  dragstart: undefined,
  dragend: undefined,
  dragenter: undefined,
  dragover: undefined,  
  dragleave: undefined,
  // All of these receive the file as first parameter:
  addedfile: undefined,
  removedfile: undefined,
  thumbnail: undefined,
  error: undefined,
  processing: undefined,
  uploadprogress: undefined,
  sending: undefined,
  success: undefined, 
  complete: undefined,
  canceled: undefined,
  maxfilesreached: undefined,
  maxfilesexceeded : undefined,
  // All of these receive a list of files as first parameter and are only called if the uploadMultiple option is true:
  processingmultiple: undefined,
  sendingmultiple: undefined,
  successmultiple: undefined,
  completemultiple: undefined,
  canceledmultiple: undefined, 
  //Special events:
  totaluploadprogress: undefined,
  reset: undefined,
  queuecomplete: undefined,

  createDropzone(element){
    this.set('myDropzone', new Dropzone(element,{
      url: this.url,
      method: this.method,
      parallelUploads: this.parallelUploads,
      maxFilesize: this.maxFilesize,
      filesizeBase: this.filesizeBase,
      paramName: this.paramName,
      uploadMultiple: this.uploadMultiple,
      headers: this.headers,
      addremoveLinks: this.addremoveLinks,
      previewsContainer: this.previewsContainer,
      clickable: this.clickable,
      maxThumbnailsize: this.maxThumbnailsize, 
      thumbnailWidth: this.thumbnailWidth,
      thumbnailHeight: this.thumbnailHeight,
      maxFiles: this.maxFiles,
      acceptedFiles: this.acceptedFiles,
      autoProccessQueue: this.autoProccessQueue,
      forceFallback: this.forceFallback,

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

      // Events

      // All of these receive the event as first parameter:
      drop: this.drop,
      dragstart: this.dragstart,
      dragend: this.dragend,
      dragenter: this.dragenter,
      dragover: this.dragover,
      dragleave: this.dragleave,
      // All of these receive the file as first parameter: 
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
      maxfilesexceeded : this.maxfilesexceeded ,
      // All of these receive a list of files as first parameter and are only called if the uploadMultiple option is true: 
      processingmultiple: this.processingmultiple,
      sendingmultiple: this.sendingmultiple,
      successmultiple: this.successmultiple,
      completemultiple: this.completemultiple,
      canceledmultiple: this.canceledmultiple,
      //Special events:
      totaluploadprogress: this.totaluploadprogress,
      reset: this.reset,
      queuecomplete: this.queuecomplete,
    }));
  },

  insertDropzone: Ember.on('didInsertElement', function(){
    Dropzone.autoDiscover = false;
    this.createDropzone('div.dropzone');
    return this.myDropzone;
  })
});
