// Each todo item will be rendered on the page using
// a todo view

// Create a Todo view
// 
// Properties:
//  a. tagName => the element which will be represented by el
//  b. events => events on DOM elements
//  c. initialize => initialize a view
//  d. render => render a view
var TodoView = Backbone.View.extend({
  tagName: 'li',

  todoTmpl: _.template($('#itemTemplate').html()),

  // DOM events
  events: {
    'dblclick label': 'edit',
    'keydown .edit': 'updateOnEnter',
    'blur .edit': 'close',
    'change .status': 'taskCompleted'
  },

  // Called when the view is first created
  initialize: function () {
    // When the model changes render the view
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
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
    var ENTER_KEY = 13, message = false;

    if(event.keyCode !== ENTER_KEY) return;

    message = this.model.set({
      title: this.input.val()
    }, { validate: true });

    if(message && this.model.hasChanged()) return;

    if(message) {
      this.close(event);
      console.log("Not updated: ", this.model);
    } else {
      console.log("Error: ", this.model);
    }
  },

  // Close editing mode of title
  close: function () {
    this.render();
    
    console.log("Close!", event);
    event.stopPropagation();
  },

  // Check off the task from list
  taskCompleted: function () {
    this.model.set({ 
      completed: this.$('.status')[0].checked
    });
    console.log("Task completed!", this);
  }
});

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
// DO I NEED A TEMPLATE FOR THIS COLLECTION => YES

// View:
//  a. tag
//  b. events
//  c. render
var TodoListView = Backbone.View.extend({
  tagName: 'div',

  events: {
    // Dont have any interactive DOM elements within my view
  },

  initialize: function () {
    // 'render' method of view will always be called with view as context
    _.bindAll(this, 'render');
    // bind 'reset' event of collection to view's render
    this.collection.bind('reset', this.render);

    // compile template
    this.template = _.template($("#listTemplate").html());
  },

  render: function () {
    var $list = undefined,
        todoListItems = this.collection;

    // Insert the template, and find the list ul
    this.$el.html(this.template({}));
    $list = this.$('#todoList');

    todoListItems.forEach(function (todoItem) {
      // For each item create the view
      var todoView = new TodoView({ model: todoItem });
      // Append the view to the main div
      $list.append(todoView.render().el);
    });

    return this;
  }
});