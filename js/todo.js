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
    'keydown .edit': 'updateOnEnter',
    'blur .edit': 'close',
    'change .status': 'taskCompleted'
  },

  // Called when the view is first created
  initialize: function () {
    // The main element for this view?
    var _view = this;

    // this.$el = $("#todo");
    this.model.on('change', function () {
      _view.render();
      console.log("Model changed");
    });
  },

  // Render the view
  render: function () {
    var todoItem = this.todoTmpl(this.model.toJSON());
    
    this.$el.html(todoItem);

    this.input = this.$(".edit");
    return this;
  },

  // Edit the title
  edit: function () {
    this.input
      .removeClass("hide")
      .focus()
      .prev('label').hide();
    
    console.log("Edit Todo!");
  },

  // Update the title on enter
  updateOnEnter: function (event) {
    var ENTER_KEY = 13;

    if(event.keyCode === ENTER_KEY) {
      this.model.set({ title: this.input.val() });
      console.log("Updated!", this.model);
      this.close(event);
    }
  },

  // Close editing mode of title
  close: function () {
    this.input
      .addClass("hide")
      .prev("label").show();
    
    console.log("Close!", event);
    event.stopPropagation();
  },

  // Check off the task from list
  taskCompleted: function () {
    this.model.set({ completed: this.$('.status')[0].checked });
    console.log("Task completed!", this);
  }
});

var todoView = new TodoView({ model: todo });
// $("#todo").append(todoView.render().el);

// Cant understand the mapping between a model and a view
// More specifically, cant understand the cardinality between them

// Mapping:
//  a. container => view container


// DONT THINK IN TERMS OF TRADITIONAL MVC

// MODEL => MODEL
// VIEW => TEMPLATE
// CONTROLLER => VIEW

var TodoCollection = Backbone.Collection.extend({
  model: Todo
});

var todoList = new TodoCollection([
  { id: 1, title: "Single Model and View", completed: true, },
  { id: 2, title: "Collection of model", completed: true },
  { id: 3, title: "Fix problem in update event", completed: true }
]).on("add", function (todo) {
  console.log("Added Todo: ", todo.get('title'),
    " Completed: ", todo.get('completed'));
}).on("change:completed", function (todo) {
  console.log("Completed: ", todo.get('title'));
}).on("remove", function (todo) {
  console.log("Removed Todo: ", todo.get('title'),
    " Completed: ", todo.get('completed'));
})

console.log("Todo List: ", todoList.length);

// Update the complete collection all at once
// If no title is given, title is set to empty string
// todoList.set([
//   { id: 1, completed: true},
//   { id: 3, title: "Backbone Applications", completed: true}
// ]);

// Reset the whole collection
// No callbacks are invoked
// todoList.reset();

// DO I NEED A VIEW FOR THIS COLLECTION? => YES
// DO I NEED A TEMPLATE FOR THIS COLLECTION => ???

// View:
//  a. el,
//  b. events
//  c. render
var TodoListView = Backbone.View.extend({
  tagName: 'div',

  events: {
    // No events for now
  },

  initialize: function () {
    this.template = _.template($("#listTemplate").html());

    // Binding => Yes
    // When the collection changes, render the view
    // this.bind("change", this.render);

  },

  render: function () {
    var todoList,
        todoListItems = this.collection;
        view = this.$el.html(this.template({})).find('#todoList');

    todoListItems.forEach(function (todoItem) {
      // For each item create the view
      var todoView = new TodoView({ model: todoItem });
      // Append the view to the main div
      view.append(todoView.render().el);
    });

    return this;
  }
});

var todoListView = new TodoListView({ collection: todoList });
$("body").append(todoListView.render().el);