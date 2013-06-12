var root = this;

Tinytest.add('Control - create', function (test) {
  Control.create('TestControl', {
  });

  test.equal(typeof root['TestControl'], 'function');
  test.equal(root['TestControl'].typeName, 'TestControl');
});

Tinytest.add('Control - extend', function (test) {
  var Parent = Control.create('Parent', {
    toString: function () {
      return 'parent';
    }
  });

  var Child = Control.create('Child', {
    extend: Parent,
  });

  test.equal(Child._super, Parent, 'Child super class should be Parent');

  var child = new Child();

  test.equal(child.toString(), 'parent', 'super methods are in prototype chain');

  Child.prototype.toString = function () {
    return 'child';
  };

  test.equal(child.toString(), 'child', 'child methods override');
  test.equal(child._super, Parent.prototype, 'child _super not set to parent prototype');
  test.equal(Child._super, Parent, 'Child _super not set to Parent');
});

Tinytest.add('Control - constructor', function (test) {
  var init = false;
  var initArgs = null;

  var Child = Control.create('Ctor', {
    initialize: function () {
      init = true;
      initArgs = arguments;
    }
  });

  var args = {template: 'test'};
  var child = new Child(args);

  test.isTrue(init, 'initialize method not called on child');
  test.equal(initArgs[0], args);
});

Tinytest.add('Control - handlebars', function (test) {
  var HelperControl = Control.create('Helper', {
  });

  test.isTrue(Handlebars._default_helpers['Helper']);

  var inst = new HelperControl({});

  var html = Handlebars._default_helpers['Helper'].call(
    {}, { hash: {}, fn: function () { return 'test' } });

  test.equal(html, 'test');
});
