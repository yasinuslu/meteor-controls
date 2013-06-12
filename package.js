Package.describe({
  summary: 'Base class for UI controls'
});

Package.on_use(function (api) {
  api.use('handlebars', 'client');
  api.add_files('control.js', 'client');
});

Package.on_test(function (api) {
  api.use('control', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');
  api.add_files('control-test.js', 'client');
});
