import Ember from 'ember';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  addedfile: computed(function() {
    Ember.Logger.debug('addedFile happened');
  })
});
