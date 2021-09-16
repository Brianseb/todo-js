import "./styles.css"

// import { Todo } from "./classes/todo.class.js"
// import { TodoList } from "./classes/todo-list.class.js"

import { Todo, TodoList } from "./classes";
import { crearTodoHtml } from "./js/componentes";

export const todoList = new TodoList();

todoList.todos.forEach(todo => crearTodoHtml(todo));

console.log(todoList.todos);