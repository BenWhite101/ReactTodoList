import React, {useState, useRef, useEffect} from 'react';
import uuidv4 from 'uuid/v4' // library with func that generates random id
import TodoList from './TodoList'

//useEffect - localstorage thing

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  //const [todos, setTodos] =  useState([{id: 1, name: 'Todo 1', complete: false}])
  const [todos, setTodos] =  useState([])
  const todoNameRef = useRef() // Give access to input element



  //Storing
  useEffect(() => { // call once - this is for refreshing page persist
    // gets local storage key from local storage
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  //Getting our todos
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id){
    const newTodos = [...todos] //create copy
    // find the Todo that == the id
    const todo = newTodos.find(todo => todo.id === id)
   
   todo.complete = !todo.complete //toggle?
   setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null  //Clear input
  }

  function handleClearTodos(e) {
    const newTodos = todos.filter(todo => !todo.complete) //all none complete todos
    setTodos(newTodos)
  }
 
  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo} />  
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} left todo</div>
    
    </>
    )
}

// Filter todos that are not complete

export default App;