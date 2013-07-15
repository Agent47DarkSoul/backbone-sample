// Create a Todo model
var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },

  // Validates the model
  validate: function (attributes) {
    console.log("Validating: ", attributes);

    if(!attributes.title) {
      return "Title can't be blank";
    }
  },
});