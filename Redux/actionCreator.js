import { addTodo , removeTodo , completTodo , filterAllTodos , filterCompletedTodos , filterUnCompletedTodos } from "./actionTypes.js";

export const addTodoAction =(title)=>{
    return{
        type : addTodo,
        title
    }
}

export const removeTodoAction = (id)=>{
    return{
        type : removeTodo,
        id
    }
}

export const completTodoAction =(id)=>{
    return{
        type : completTodo,
        id
    }
}
export const filterAllTodosAction =()=>{
    return{
        type : filterAllTodos
    }
}
export const filterCompletedTodosAction =()=>{
    return{
        type : filterCompletedTodos
    }
}
export const filterUnCompletedTodosAction =()=>{
    return{
        type : filterUnCompletedTodos
    }
}