import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import Dropzone from 'dropzone';

const _possibleEvents = Dropzone.prototype.events;

// options found in https://docs.dropzone.dev/configuration/basics/configuration-options

function eventArgify(e) {
  return `on${e.charAt(0).toUpperCase() + e.slice(1)}`;
}

export default class DropZoneComponent extends Component {
  @tracked _myDropzone;
  @tracked _dropzoneOptions;

  get _config() {
    const { config = {}, ...args } = { ...this.args };
    const output = { thumbnailHeight: null, thumbnailWidth: null, ...config };
    Object.keys(args).forEach((e) => {
      if (
        !_possibleEvents.includes(eventArgify(e)) && // not a dropzone event
        Object.prototype.hasOwnProperty.call(args, e) &&
        typeof args[e] !== 'undefined'
      ) {
        output[e] = args[e];
      }
    });

    assert('Url is required for dropzone', output.url);
    if (!output.url) output.url = '#';

    return output;
  }

  setEvents() {
    const events = _possibleEvents.reduce((_events, e) => {
      const eventArg = eventArgify(e);
      if (
        Object.prototype.hasOwnProperty.call(this.args, eventArg) &&
        typeof this.args[eventArg] === 'function'
      ) {
        _events[e] = this.args[eventArg];
      }

      return _events;
    }, {});

    const { _myDropzone } = this;

    for (const e in events) {
      if (Object.prototype.hasOwnProperty.call(events, e)) {
        _myDropzone.on(e, function () {
          return events[e](_myDropzone, ...arguments);
        });
      }
    }
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

    const config = this._config;

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
