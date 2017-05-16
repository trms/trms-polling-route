import Ember from 'ember';

export default Ember.Service.extend({
  _active: true,

  active: Ember.computed('_active', function() {
    return this.get('_active');
  }),

  start() {
    Ember.Logger.info('Polling has been started');
    this.set('_active', true);
  },

  stop() {
    Ember.Logger.info('Polling has been stopped');
    this.set('_active', false);
  }
});