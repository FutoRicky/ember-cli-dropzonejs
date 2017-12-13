import Ember from 'ember';

export default Ember.Controller.extend({
  addedfile: Ember.computed(function() {
    Ember.Logger.debug('addedFile happened');
  })
});
