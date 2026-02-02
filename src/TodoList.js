import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo, updateTodoName, onEditSubmit }) { //pass down prop
    return (
        todos.map(todo => {
            return (
                <Todo
                    key={todo.id}
                    toggleTodo={toggleTodo}
                    updateTodoName={updateTodoName}
                    onEditSubmit={onEditSubmit}
                    todo={todo}
                />
            )
        })
    )
}
