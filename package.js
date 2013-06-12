Package.describe({
  summary: 'UI control library for Meteor' 
});

Package.on_use(function (api) {
  api.use('handlebars', 'client');

  api.add_files([
    'lib/control.js',
    'lib/controls/form/form.js'
  ], 'client');
});

Package.on_test(function (api) {
  api.use('controls', 'client');
  api.use(['templating', 'tinytest', 'test-helpers'], 'client');

  api.add_files([
    'lib/control-test.js',
    'lib/controls/form/form-test.html',
    'lib/controls/form/form-test.js'
  ], 'client');
});
