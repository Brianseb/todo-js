import { Todo } from "../classes";
import { todoList } from "..";

// Referencias en el HTML
const divTodoList = document.querySelector(".todo-list"); // Con punto porque busca por clase
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters"); // esto es para todos los filtros de los todo
const anchorFiltros = document.querySelectorAll(".filtro");
const cantidadPendientes = document.querySelector("strong");

export const crearTodoHtml = (todo) => { // Esto es para crear las tareas y se agreguen en el html
    const htmlTodo = `
    <li class="${(todo.completado) ? "completed" : ""}" data-id="${(todo.id)}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado) ? "checked" : ""}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
	    <input class="edit" value="Create a TodoMVC template">
	</li>`;

    const div = document.createElement("div");
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild); // Con esto se salta el div y carga a partir del primer elemento

    return div.firstElementChild;
}

// Eventos
txtInput.addEventListener("keyup", (event) => { // Esto es para que reconosca cuando escriben
    if (event.keyCode === 13 && !!txtInput.value) { // Esto para cuando apreta enter y el string no esta vacio
        const nuevoTodo = new Todo(txtInput.value);

        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);

        txtInput.value = "";

        contador();
    }
});

divTodoList.addEventListener("click", (event) => {
    const nombreElemento = event.target.localName; // Esto me dice que elemento estoy tocando
    const todoElemento = event.target.parentElement.parentElement; // Para subir en la jerarquia del objeto que estoy tocando
    const todoID = todoElemento.getAttribute("data-id"); // Para conseguir el ID del elemento

    if (nombreElemento.includes("input")) { // Esto significa que hizo click en el check
        todoList.marcarCompletado(todoID);
        todoElemento.classList.toggle("completed"); // toggle añade o cambia la clase a al especificada
    } else if (nombreElemento.includes("button")) { // Esto significa que hizo click en borrar
        todoList.eliminarTodo(todoID); // Para borrarlo de la memoria del array
        divTodoList.removeChild(todoElemento); // Para borarlo del HTML
    }

    contador();
});

btnBorrar.addEventListener("click", () => { // simplemente que borre cuando hago click
    // todoList.eliminarCompletados();
    // for (let i = divTodoList.children.length - 1; i >= 0; i--) { // Esta escrito asi para que borre de abajo (ultimo) para arriba (primero)
    //     const elemento = divTodoList.children[i];
    //     if (elemento.classList.contains("completed")) { // Si mi elemento contiene la clase completed
    //         divTodoList.removeChild(elemento);
    //     }
    // }
    for (let i = divTodoList.children.length - 1; i >= 0; i--) { // Esta escrito asi para que borre de abajo (ultimo) para arriba (primero)
        todoList.eliminarCompletados(); // Para que ahorre recursos y no lo ejecute siempre lo pongo aca adentro
        // const elemento = divTodoList.children[i];
        if (divTodoList.children[i].classList.contains("completed")) { // Si mi elemento contiene la clase completed
            divTodoList.removeChild(divTodoList.children[i]);
        }
    }

    contador();
});

ulFiltros.addEventListener("click", (event) => {
    const filtro = event.target.text; // Esto me trae el nombre de los 3 elementos
    if (!filtro) { // Si no hay ningun filtro hace un return
        return;
    }
    anchorFiltros.forEach(elem => elem.classList.remove("selected")); // Esto hace que solo le saque la palabra selected
    event.target.classList.add("selected"); // Le añade al palabra selected

    for (const elemento of divTodoList.children) {
        elemento.classList.remove("hidden"); // Le saco a todos mis elementos la clase hidden
        const completado = elemento.classList.contains("completed"); // Pregunto si este elemento tiene la clase completada

        switch (filtro) {
            case "Pendientes": // Si el filtro seleccionado es pendientes
                if (completado) {  // y mi objeto tiene la clase completado
                    elemento.classList.add("hidden"); // le agrega la clase hidden para que lo esconda
                }
                break;

            case "Completados": // Si el filtro seleccionado es completados
                if (!completado) {  // y mi objeto no tiene la clase completado
                    elemento.classList.add("hidden"); // le agrega la clase hidden para que lo esconda
                }
                break;
        }
    }
});

const contador = () => { // Esto lo hice yo para que sume las pendientes
    let pendientes = 0;

    for (const elementos of divTodoList.children) {
        if (!elementos.classList.contains("completed")) {
            pendientes++;
        }
    }

    cantidadPendientes.innerText = pendientes;
}