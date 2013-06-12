var wrapped = [];

Tinytest.add('Form - values', function (test) {
  var divWrapper = new OnscreenDiv(Spark.render(Template.form))
    , form = DomUtils.find(divWrapper.div, 'form');
  
  try {
    var control = new Form();
    var values = control.values(form);

    test.equal(values.text, 'text');
    test.equal(values['checkbox-checked'], true);
    test.equal(values['checkbox-unchecked'], false);
    test.equal(values.radio, 'selected');
    test.equal(values.textarea, 'textarea');
  } finally {
    divWrapper.kill();
  }
});

Tinytest.add('Form - events', function (test) {
  var divWrapper = new OnscreenDiv(Spark.render(Template.form))
    , form = DomUtils.find(divWrapper.div, 'form');

  var _onSubmit = Form.prototype.onSubmit;
  
  try {
    var args = null;

    Form.prototype.onSubmit = function (fields, form) {
      args = arguments;
    };

    simulateEvent(form, 'submit');

    test.isTrue(args);
    test.isTrue(args[0]);
    test.equal(args[1], form);

  } finally {
    Form.prototype.onSubmit = _onSubmit;
    divWrapper.kill();
  }
});

Tinytest.add('Form - extends', function (test) {
  var args = null;

  Control.create('ExtendedForm', {
    extend: Form,

    onSubmit: function (fields, form) {
      args = arguments;
    }
  });

  var divWrapper = new OnscreenDiv(Spark.render(Template.extendedForm))
    , form = DomUtils.find(divWrapper.div, 'form');
  
  try {
    simulateEvent(form, 'submit');
    test.isTrue(args);
    test.isTrue(args.length);
    test.equal(args[1], form);
  } finally {
    divWrapper.kill();
  }
});
