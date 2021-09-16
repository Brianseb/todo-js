
export class Todo { // Para construir un todo necesito todo esto
    
    static fromJson({id, tarea, completado, creado}) {
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }
    
    constructor(tarea) {
        this.tarea = tarea; // la tarea en que ingrese
        this.id = new Date().getTime(); // Esto puede ser utilizado como ID para este ejercicio pero se puede llegar a repetir
        this.completado = false; // Si la tarea esta terminada o no
        this.creado = new Date(); // La fecha de creacion de la tarea
    }
}