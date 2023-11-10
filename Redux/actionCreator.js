import { addTodo, removeTodo, completTodo, getAllTodos } from "./actionTypes.js";

export const addTodoAction = (title) => {
    return {
        type: addTodo,
        title
    }
}

export const removeTodoAction = (id) => {
    return {
        type: removeTodo,
        id
    }
}

export const completTodoAction = (id) => {
    return {
        type: completTodo,
        id
    }
}

export const getAllTodosAction =(todos)=>{
    return {
        type: getAllTodos,
        todos
    }
}
