import React from 'react'

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick() {
        toggleTodo(todo.id)
        //call toggleTodo with the id of the todo clicked
    }
    return (
        <div class="todo">
            <label>
                <input type="checkbox" onChange={handleTodoClick}  checked={todo.complete}></input>
                <input class="name" >{todo.name}</input>
            </label>
            
        </div>
    )
}
