import React, { useEffect, useRef, useState } from 'react'

export default function Todo({todo, toggleTodo, updateTodoName, onEditSubmit}) {
    const [isEditing, setIsEditing] = useState(false)
    const nameRef = useRef(null)

    function handleTodoClick() {
        toggleTodo(todo.id)
        //call toggleTodo with the id of the todo clicked
    }

    function commitEdit(shouldFocusInput) {
        if (!nameRef.current) return
        const nextName = nameRef.current.textContent.trim()
        if (nextName === '') {
            nameRef.current.textContent = todo.name
        } else if (nextName !== todo.name) {
            updateTodoName(todo.id, nextName)
        }
        setIsEditing(false)
        if (shouldFocusInput && onEditSubmit) onEditSubmit()
    }

    function handleEditClick() {
        setIsEditing(true)
    }

    function handleNameKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            commitEdit(true)
        }
    }

    function handleNameBlur() {
        if (isEditing) commitEdit(false)
    }

    useEffect(() => {
        if (!isEditing || !nameRef.current) return
        const el = nameRef.current
        el.focus()
        const range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        const selection = window.getSelection()
        if (selection) {
            selection.removeAllRanges()
            selection.addRange(range)
        }
    }, [isEditing])

    return (
        <div class="todo" id={`todo-${todo.id}`}>
            <div class="todo-row">
                <label>
                    <input type="checkbox" onChange={handleTodoClick}  checked={todo.complete}></input>
                    <span
                        ref={nameRef}
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        class="name"
                        onKeyDown={handleNameKeyDown}
                        onBlur={handleNameBlur}
                        tabIndex={0}
                    >
                        {todo.name}
                    </span>
                </label>
                <button class="edit-btn" type="button" onClick={handleEditClick} aria-label="Edit todo">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l8.48-8.48.92.92-8.48 8.48zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.8 1.8 3.75 3.75 1.8-1.8z"/>
                    </svg>
                </button>
            </div>
            
        </div>
    )
}
