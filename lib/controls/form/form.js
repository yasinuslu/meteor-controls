var warn = function (msg) {
  if (console && console.warn)
    console.warn(msg);
};

Control.create('Form', {
  render: function (data) {
    var self = this
      , html;

    if (!this.template) return '';

    html = this.template(data);

    html = Spark.attachEvents({
      'submit form': function (e, tmpl) {
        self.onFormSubmit(e, tmpl);
      }
    }, html);

    return html;
  },

  onFormSubmit: function (e, tmpl) {
    var form = tmpl.find('form')
      , fields = this.values(form);
    e.preventDefault();
    this.onSubmit(fields, form);
    return false;
  },

  onSubmit: function (fields, form) {
    warn('onSubmit should be overriden in classes that inherit from Form');
  },

  values: function (form) {
    var field
      , name
      , value
      , fields = {};

    for (var i = 0; i < form.length; i++) {
      field = form[i];
      name = field.name;

      if (!name) continue;

      switch(field.type) {
        case 'submit':
          break;
        case 'checkbox':
          value = field.checked ? true : false;
          break;
        case 'radio':
          value = field.checked ? field.value : undefined;
          break;
        default:
          value = field.value;
      }

      if (typeof value !== 'undefined')
        fields[name] = value;
    }

    return fields;
  }
});
