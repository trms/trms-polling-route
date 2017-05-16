import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Mixin.create({
  polling: Ember.inject.service(),

  pollingInterval: 5000,
  startPollingEvenInTesting: false,

  setupController() {
    this._super(...arguments);

    if (Ember.testing && this.get('startPollingEvenInTesting') === false) { return; }

    Ember.assert("You must specify a poll method when using the PollingRouteMixin", !!this.get('poll'));
    Ember.assert("pollingInterval property must be at least 500ms", this.get('pollingInterval') >= 500);

    this.get('pollingTask').perform();
    this.get('alwaysPollingTask').perform();
  },

  alwaysPollingTask: task(function * () {
    let alwaysPoll = this.get('alwaysPoll');
    let interval = this.get('pollingInterval');
    let route = this;

    while(alwaysPoll) {
      try{
        yield Ember.RSVP.resolve(route.alwaysPoll());
      } catch(e) {
        let status = e.jqXHR.status;
        if(status === 404){
          this.controllerFor('application').set('offline',true);
        }
        else if(status === 0){
          this.controllerFor('application').set('offline',true);
        }
      }
      yield timeout(interval);
    }
  }).cancelOn('deactivate').restartable(),

  pollingTask: task(function * () {
    let poll = this.get('poll');
    let interval = this.get('pollingInterval');
    let route = this;

    while(poll) {
      if (this.get('polling.active')) {
        try{
          yield Ember.RSVP.resolve(route.poll());
        } catch(e) {
          //do nothing
        }
      } else {
        Ember.Logger.info('Skipping poll call');
      }
      yield timeout(interval);
    }
  }).cancelOn('deactivate').restartable(),


  actions:{
    pollNow(){
      this.poll();
    },
  },
});