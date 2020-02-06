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
    todoNameRef.current.focus();
  }

  function handleClearTodos(e) {
    const newTodos = todos.filter(todo => !todo.complete) //all none complete todos
    setTodos(newTodos)
  }

  function handleClearAll(e) {
    const newTodos = todos.filter(todo => !todo.complete && todo.complete) //all none complete todos
    setTodos(newTodos)
  }


  /*
  document.getElementById('enterTodo').addEventListener("keyup", function(event) {
    event.preventDefault();
    keyPressed(event) {
      if (event.key === "Enter") {
        
      }
    }
  }) */


  
 
  return (
    <>
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900|Poppins:300,400,500,600,700,900&display=swap" rel="stylesheet"/> 
    <h1><button class="btn clearall" onClick={handleClearAll}>New</button> Our List <div class="amount"><span>{todos.filter(todo => !todo.complete).length}</span> left</div></h1>
    <div class="todoList">
      <TodoList todos={todos} toggleTodo={toggleTodo} />  
    </div>
    <div class="toolbar">
    
      <input id="enterTodo" ref={todoNameRef} /*onKeyPress={this.keyPressed}*/ type="text" />

      <div class="actions">
        
        <button class="btn clear" onClick={handleClearTodos}>Clear</button>
        <button class="btn add" onClick={handleAddTodo}>Add</button>
      </div>
      
    </div>

    
    
    </>
    )
}

// Filter todos that are not complete

export default App;
