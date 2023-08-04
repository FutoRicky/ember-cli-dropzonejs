import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import defaultOptions from 'dropzone/src/options';
import Dropzone from 'dropzone';

export default class DropZoneComponent extends Component {
  @tracked _myDropzone;
  @tracked _dropzoneOptions;

  setEvents() {
    const events = Dropzone.events;
    const { _myDropzone } = this;
    console.log({ _myDropzone });

    for (let e in events) {
      if (typeof events[e] !== 'undefined') {
        _myDropzone.on(e, events[e]);
      }
    }
  }

  get _dzConfig() {
    const { config = {} } = this.args,
      output = {};

    console.log({ defaultOptions });

    Object.keys(defaultOptions).forEach((e) => {
      // need to set null versions of thumbnail width / height
      if (e === 'thumbnailHeight' || e === 'thumbnailWidth') output[e] = null;

      // use dynamic hash first
      // eslint-disable-next-line no-prototype-builtins
      if (config.hasOwnProperty(e)) output[e] = config[e];

      // if property is set specifically, override
      // look at the arguments
      if (typeof this.args[e] !== 'undefined') output[e] = this.args[e];
    });

    assert('Url is required for dropzone', output.url);
    // Preserve defaults for existing apps/tests
    if (!output.url) output.url = '#';

    return output;
  }

  defineDropzoneOptions() {
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

    this._dropzoneOptions = config;
  }

  createDropzone(element) {
    const region =
      this.maxDropRegion && typeof FastBoot === 'undefined'
        ? document.body
        : element;
    this._myDropzone = new Dropzone(region, this._dropzoneOptions);
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this._myDropzone.destroy();
  }

  @action
  didInsert(element) {
    this.defineDropzoneOptions();

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

        this._myDropzone.emit('addedfile', dropfile);

        if (typeof thumbnail === 'string') {
          this._myDropzone.emit('thumbnail', dropfile, thumbnail);
        }

        this._myDropzone.emit('complete', dropfile);
        this._myDropzone.files.push(file);
      });
    }

    return this._myDropzone;
  }
}
