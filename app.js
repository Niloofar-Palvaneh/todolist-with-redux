import { addTodo, removeTodo, completTodo, getAllTodos }
    from "./Redux/actionTypes.js";
import { addTodoAction, removeTodoAction, completTodoAction, getAllTodosAction }
    from "./Redux/actionCreator.js";

let inputElem = document.querySelector(".add-todo-input")
let addTodoElem = document.querySelector(".add-icon")
let todosContainer = document.querySelector(".todo-items")
let filterTodoElem = document.querySelector(".filter-todo")

window.removeTodoHandler = removeTodoHandler
window.completedTodoHandler = completedTodoHandler

function reduser(state = [], action) {
    switch (action.type) {
        case getAllTodos: {
            return state
        }
        case addTodo: {
            let newState = [...state]
            let newTodo = {
                id: crypto.randomUUID(),
                title: action.title,
                isCompleted: false
            }
            newState.push(newTodo)
            return newState
        }
        case removeTodo: {
            let newState = [...state]
            newState = newState.filter(todo => todo.id !== action.id)
            return newState
        }
        case completTodo: {
            let copyState = [...state]
            copyState.some(todo => {
                if (todo.id === action.id) {
                    todo.isCompleted = !todo.isCompleted
                }
            })
            return copyState
        }
        default: {
            return state
        }
    }
}



addTodoElem.addEventListener("click", () => {
    let todoTitle = inputElem.value
    store.dispatch(addTodoAction(todoTitle))
    let todos = store.getState()
    gnerateTodosInDom(todos)
})

function removeTodoHandler(id) {
    store.dispatch(removeTodoAction(id))
    let todos = store.getState()
    gnerateTodosInDom(todos)
}

function completedTodoHandler(id) {
    store.dispatch(completTodoAction(id))
    let todos = store.getState()
    gnerateTodosInDom(todos)
}


filterTodoElem.addEventListener("change", (event) => {
    if (event.target.value == "Completed") {
        let todos = store.getState()
        store.dispatch(getAllTodosAction(todos))
        todos = todos.filter(todo => todo.isCompleted === true)
        gnerateTodosInDom(todos)
    } else if (event.target.value == "Uncompleted") {
        let todos = store.getState()
        store.dispatch(getAllTodosAction(todos))
        todos = todos.filter(todo => todo.isCompleted === false)
        gnerateTodosInDom(todos)
    } else if (event.target.value == "All") {
        let todos = store.getState()
        store.dispatch(getAllTodosAction(todos))
        gnerateTodosInDom(todos)
    }
})

const store = Redux.createStore(reduser)

function gnerateTodosInDom(todos) {
    todosContainer.innerHTML = ""
    todos.forEach(todo => {
        todosContainer.insertAdjacentHTML('beforeend', `
                <div class="todo-item ${todo.isCompleted && "completedTodo"}">
                    <p class="todo-title">
                        ${todo.title}
                    </p>
                    <div class="actions">
                        <div class="icon complete-icon"  onclick=completedTodoHandler("${todo.id}")>
                            <svg  fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <div class="icon remove-icon" onclick=removeTodoHandler("${todo.id}")>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>
                    </div>
                </div>
        `)
        inputElem.value = ""
    })
}