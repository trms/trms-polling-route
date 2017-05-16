import Ember from 'ember';
import PollingRouteMixin from 'trms-polling-route/mixins/polling-route';
import { module, test } from 'qunit';

let subject = null;

module('Unit | Mixin | polling route', {
  afterEach() {
    if (subject) {
      Ember.run(function() {
        subject.destroy();
      });
    }
  }
});

test('Assert when no poll method is defined', function(assert) {
  let PollingRouteObject = Ember.Object.extend(PollingRouteMixin);
  subject = PollingRouteObject.create({
    startPollingEvenInTesting: true
  });
  assert.throws(() => {
    subject.setupController();
  }, /poll method/);

});

test('Assert when no interval is less than 500 ', function(assert) {
  let PollingRouteObject = Ember.Object.extend(PollingRouteMixin);
  subject = PollingRouteObject.create({
    pollingInterval: 200,
    poll: function() {},
    polling: {
      active: true
    },
    startPollingEvenInTesting: true
  });
  assert.throws(() => {
    subject.setupController();
  }, /pollingInterval/);
});

test("poll is called periodically", function(assert) {
  let count = 0;
  let done = assert.async(5);
  let PollingRouteObject = Ember.Object.extend(PollingRouteMixin);
  subject = PollingRouteObject.create({
    pollingInterval: 500,
    poll: function() {
      count++;
      assert.ok(true, `poll() called ${count} times.`);
      done();
    },
    polling: {
      active: true
    },
    startPollingEvenInTesting: true
  });

  Ember.run(function() {
    subject.setupController();
  });
});

test("poll is not called when polling disabled", function(assert) {
  let count = 0;
  let done = assert.async();
  let PollingRouteObject = Ember.Object.extend(PollingRouteMixin);
  subject = PollingRouteObject.create({
    pollingInterval: 500,
    poll: function() {
      assert.ok(false, 'Poll was called');
    },
    polling: {
      active: false
    },
    startPollingEvenInTesting: true
  });

  Ember.run(function() {
    subject.setupController();
  });

  Ember.run.later(function() {
    assert.equal(count, 0, 'Polling is turned off');
    done();
  }, 1000)
});
