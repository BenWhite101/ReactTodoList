import React, {useState, useRef, useEffect} from 'react';
import uuidv4 from 'uuid/v4' // library with func that generates random id
import TodoList from './TodoList'

//useEffect - localstorage thing

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  //const [todos, setTodos] =  useState([{id: 1, name: 'Todo 1', complete: false}])
  const [todos, setTodos] =  useState([])
  const todoNameRef = useRef() // Give access to input element
  const [lastAddedId, setLastAddedId] = useState(null)



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

  useEffect(() => {
    if (!lastAddedId) return
    const el = document.getElementById(`todo-${lastAddedId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    if (todoNameRef.current) {
      todoNameRef.current.focus()
    }
  }, [lastAddedId])


  function toggleTodo(id){
    const newTodos = [...todos] //create copy
    // find the Todo that == the id
    const todo = newTodos.find(todo => todo.id === id)
   
   todo.complete = !todo.complete //toggle?
   setTodos(newTodos)
  }

  function updateTodoName(id, name) {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id !== id) return todo
        return { ...todo, name }
      })
    })
  }

  function handleEditSubmit() {
    if (todoNameRef.current) {
      todoNameRef.current.focus()
    }
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    const id = uuidv4()
    setTodos(prevTodos => {
      return [...prevTodos, {id: id, name: name, complete: false}]
    })
    setLastAddedId(id)
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

  function handleInputKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTodo()
    }
  }

  /*
  document.getElementById('enterTodo').addEventListener("keyup", function(event) {
    event.preventDefault();
    keyPressed(event) {
      if (event.key === "Enter") {
        
      }
    }
  }) */

  function myFunction() {
    var element = document.getElementById("body");
    //element.classList.add("mystyle");
    console.log(element.className);
    if (element.className === 'purple'){
      element.className = 'orange';
    } else if (element.className === 'orange'){
      element.className = 'green';
    } else if (element.className === 'green'){
      element.className = 'blue';
    } else if (element.className === 'blue'){
      element.className = 'purple';
    }
 }

 
  
 
  return (
    <>
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900|Poppins:300,400,500,600,700,900&display=swap" rel="stylesheet"/> 
    <h1 onClick={myFunction}><button class="btn clearall" onClick={handleClearAll}>New</button> Shopix <div class="amount"><span>{todos.filter(todo => !todo.complete).length}</span> left</div></h1>
    <div class="todoList">
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        updateTodoName={updateTodoName}
        onEditSubmit={handleEditSubmit}
      />  
    </div>
    <div class="toolbar">
    
      <input id="enterTodo" ref={todoNameRef} onKeyDown={handleInputKeyDown} type="text" />

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
