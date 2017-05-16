import { moduleFor, test } from 'ember-qunit';

moduleFor('service:polling', 'Unit | Service | polling', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test(`you can 'stop' and 'start' the service and that changes the '_active' boolean`, function(assert) {
  let service = this.subject();
  assert.ok(service.get('_active'));
  service.stop();
  assert.notOk(service.get('_active'));
  service.start();
  assert.ok(service.get('_active'));
});
