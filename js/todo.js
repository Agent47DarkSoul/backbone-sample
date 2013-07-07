// Create a Todo model
var Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  }
});

var todo = new Todo({
  title: "Try out the model and its attributes in console log."
});

// Each todo item will be rendered on the page using
// a todo view

// Create a Todo view
// 
// Properties:
//  a. tagName
//  b. events
//  c. initialize
//  d. render
var TodoView = Backbone.View.extend({
  tagName: 'li',

  todoTmpl: _.template($('#itemTemplate').html()),

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close'
  },

  // Called when the view is first created
  initialize: function () {
    // The main element for this view?
    this.$el = $("#todo");
  },

  render: function () {
    var todoItem = this.todoTmpl(this.model.toJSON());
    
    this.$el.html(todoItem);

    this.input = this.$(".edit");
    return this;
  },

  edit: function () {
    this.input
      .removeClass("hide")
      .focus()
      .prev('label').hide();
    
    console.log("Edit Todo!");
  },

  updateOnEnter: function (event) {
    window.keypresssevent = event;

    console.log("Update on enter!");
  },

  close: function () {
    this.input
      .addClass("hide")
      .prev("label").show();
    
    console.log("Close!");
  }
});

var todoView = new TodoView({ model: todo });

// Cant understand the mapping between a model and a view
// More specifically, cant understand the cardinality between them

// Mapping:
//  a. container => view container


// DONT THINK IN TERMS OF TRADITIONAL MVC

// MODEL => MODEL
// VIEW => TEMPLATE
// CONTROLLER => VIEW