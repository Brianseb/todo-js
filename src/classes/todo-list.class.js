import { Todo } from ".";
import { contador } from "../js/componentes";

export class TodoList {

    constructor() { // Aca estan todos mis todos hechos
        this.cargarLocalStorage();
    }

    // Las funciones de los botones

    nuevoTodo(todo) { // 
        this.todos.push(todo)
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id); //si el ID es diferente (con un solo igual porque uno es un string y el otro un number)
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado; // Esto significa que pasa al valor opuesto
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado); // Esto es para que cree sobrescriba el array con todos los que NO estan completados
        this.guardarLocalStorage();
    }

    guardarLocalStorage() { // Para poder guardar la informacion le tengo que decir setItem para que se ponga, darle un nombre a la memoria y luego decirle que es un JSON.stringify ya que solo guarda string el local storage
        localStorage.setItem("todo", JSON.stringify(this.todos)); 
    }

    cargarLocalStorage() {
        if (localStorage.getItem("todo")) { // Le pregunto si hay informacion en el Storage y si la hay llena mi array con esa informacion
            this.todos = JSON.parse(localStorage.getItem("todo")); // Le tengo que poner JSON.parse para que convierta la informacion guardada en string a como estaba originalmente
        } else { // De lo contrario, crea un array vacio
            this.todos = [];
        }
        // this.todos = (localStorage.getItem("todo")) ? JSON.parse(localStorage.getItem("todo")) : [];
        this.todos = this.todos.map(obj => Todo.fromJson(obj));
    }
}