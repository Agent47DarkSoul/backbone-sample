// Cant understand the mapping between a model and a view
// More specifically, cant understand the cardinality between them

// Mapping:
//  a. container => view container


// DONT THINK IN TERMS OF TRADITIONAL MVC

// MODEL => MODEL
// VIEW => TEMPLATE
// CONTROLLER => VIEW


var todoList = new TodoCollection();
console.log("Todo List: ", todoList.length);

var todoListView = new TodoListView({ collection: todoList });
$("body").append(todoListView.render().el);

todoList.fetch({ reset: true });

var deletedTodoList = [];

// TODO:
// 1. Add ability to create new todos.=> DONE with buggy validations
// 2. Store the todos in localStorage => DONE