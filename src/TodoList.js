import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo }) { //pass down prop
    return (
        todos.map(todo => {
            return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
        })
    )
}
