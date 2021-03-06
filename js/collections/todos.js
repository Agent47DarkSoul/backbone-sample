var TodoCollection = Backbone.Collection.extend({
  model: Todo,

  localStorage: new Backbone.LocalStorage("todo-backbone"),
  
  completed: function () {
    return this.filter(function (todo) {
      return todo.get('completed');
    })
  },

  remaining: function () {
    return this.without.apply(this, this.completed());
  },

  nextId: function () {
    if(!this.length) {
      return 1;
    }

    return this.last().get('id') + 1;
  }
});