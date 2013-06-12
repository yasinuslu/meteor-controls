Package.describe({
  summary: 'Base class for UI controls'
});

Package.on_use(function (api) {
  api.use('handlebars', 'client');

  api.add_files([
    'lib/control.js',
    'lib/form/form.js'
  ], 'client');
});

Package.on_test(function (api) {
  api.use('controls', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');

  api.add_files([
    'lib/control-test.js',
    'lib/form/form-test.js'
  ], 'client');
});
