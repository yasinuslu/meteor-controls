Package.describe({
  summary: 'Alpha Project: UI Controls for Meteor'
});

Package.on_use(function (api) {
  api.use([
    'underscore',
    'handlebars',
    'templating'
  ], 'client');

  api.add_files([
    'lib/control.js',
    'lib/controls/form/form.js'
  ], 'client');

  if (typeof api.export !== 'undefined')
    api.export('Control', 'client');
});

Package.on_test(function (api) {
  api.use('controls', 'client');
  api.use(['templating', 'tinytest', 'test-helpers'], 'client');

  api.add_files([
    'lib/control-test.js',
    'lib/controls/form/form-test.js'
  ], 'client');
});
