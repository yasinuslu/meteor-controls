var root = this;

function inherits (Super, Child) {
  var F = function () {};
  F.prototype = Super.prototype;
  Child.prototype = new F();
  Child.prototype._super = Super.prototype;
  Child._super = Super;
  Child.prototype.constructor = Child;
  return Child;
}

Control = function (options) {
  options = this.options = options || {};
  this.template = options.template;
};

Control.typeName = 'Control';

Control.prototype = {
  constructor: Control,

  render: function (data) {
    if (!this.template) return;
    return this.template(data);
  }
};

Control.create = function (name, prototype) {
  var ChildControl = function () {
    Control.prototype.constructor.apply(this, arguments);

    if (prototype.initialize)
      prototype.initialize.apply(this, arguments);
  };

  ChildControl.typeName = name;

  if (prototype.extends) {
    inherits(prototype.extends, ChildControl)
    delete prototype.extends;
  } else {
    inherits(Control, ChildControl);
  }

  _.extend(ChildControl.prototype, prototype);

  Control.registerHelper(name, ChildControl);
  root[name] = ChildControl;
  return root[name];
};

Control.registerHelper = function (name, ControlClass) {
  if (Handlebars) {
    Handlebars.registerHelper(name, function (options) {
      var controlOptions = options.hash
        , data = this === (window || undefined) ? {} : this
        , template = options.fn
        , control;

      control = new ControlClass(
        _.extend(
          controlOptions,
          { template: template }
        )
      );

      return control.render(data);
    });
  }
};
