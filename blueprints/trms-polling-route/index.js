/* eslint-env node */
module.exports = {
  description: '',
  normalizeEntityName: function(){

  },
  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function(options) {
    return this.addPackageToProject("ember-concurrency","^0.8.3");
  }
};
