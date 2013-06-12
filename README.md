```javascript
Control.create('Form', {
  initialize: function (options) {
    // initialize
  },

  render: function (data) {
    var self = this
      , html;

    if (!this.template) return '';

    html = this.template(data);

    html = Spark.attachEvents({
      'submit form': function (e, tmpl) {
        self.onSubmit(e.currentTarget);
      }
    }, html);

    return html;
  },

  // override in child classes
  onSubmit: function (form) {
  }
});

Control.create('LoginForm', {
  extends: Form,

  onSubmit: function (form) {
    // do something with the form
  }
});
```

```html
<template name="loginForm">
  {{#LoginForm paramOne="one" paramTwo="two"}}
    ... html goes here ...
  {{/LoginForm}}
</template>
```
