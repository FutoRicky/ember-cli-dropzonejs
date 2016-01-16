import Ember from 'ember';

export default Ember.Controller.extend({
  addedfile: Ember.computed(function() {
    return function() {
      Ember.Logger.debug('addedFile happened');
    };
  }),
});
