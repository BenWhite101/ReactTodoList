import React, {useState, useRef, useEffect} from 'react';
import uuidv4 from 'uuid/v4' // library with func that generates random id
import TodoList from './TodoList'

//useEffect - localstorage thing

const LOCAL_STORAGE_KEY = 'todoApp.todos'
const LOCAL_STORAGE_THEME_KEY = 'todoApp.theme'
const THEMES = ['purple', 'orange', 'green', 'blue']

function App() {
  //const [todos, setTodos] =  useState([{id: 1, name: 'Todo 1', complete: false}])
  const [todos, setTodos] =  useState([])
  const todoNameRef = useRef() // Give access to input element
  const [lastAddedId, setLastAddedId] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuClosing, setMenuClosing] = useState(false)
  const [menuView, setMenuView] = useState('root')
  const [theme, setTheme] = useState('purple')
  const closeTimerRef = useRef(null)



  //Storing
  useEffect(() => { // call once - this is for refreshing page persist
    // gets local storage key from local storage
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY)
    if (storedTheme && THEMES.includes(storedTheme)) {
      setTheme(storedTheme)
    }
  }, [])

  //Getting our todos
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
    const element = document.getElementById("body");
    if (element) {
      element.className = theme
    }
  }, [theme])

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

  function openMenu() {
    setMenuClosing(false)
    setMenuOpen(true)
  }

  function closeMenu() {
    setMenuClosing(true)
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
    }
    closeTimerRef.current = setTimeout(() => {
      setMenuOpen(false)
      setMenuClosing(false)
      setMenuView('root')
    }, 250)
  }

  function toggleMenu() {
    if (menuOpen && !menuClosing) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  function handleNewList() {
    handleClearAll()
    closeMenu()
  }

  function openThemeMenu() {
    setMenuView('theme')
  }

  function handleThemeSelect(nextTheme) {
    setTheme(nextTheme)
    closeMenu()
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

 
  
 
  return (
    <>
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900|Poppins:300,400,500,600,700,900&display=swap" rel="stylesheet"/> 
    <h1>
      <button
        class="menu-trigger"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-haspopup="true"
        aria-label="Open menu"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
        </svg>
      </button>
      {menuOpen && (
        <>
          <div class={`menu-backdrop ${menuClosing ? 'closing' : ''}`} onClick={toggleMenu}></div>
          <div class={`menu-panel ${menuClosing ? 'closing' : ''}`}>
            <div class="menu-panel-header">
              {menuView !== 'root' && (
                <button class="menu-back" onClick={() => setMenuView('root')} aria-label="Back">
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z" />
                  </svg>
                </button>
              )}
              <span>{menuView === 'theme' ? 'Choose theme' : 'Menu'}</span>
              <button class="menu-close" onClick={toggleMenu} aria-label="Close menu">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.3 9.18 12 2.88 5.71 4.29 4.29l6.3 6.3 6.29-6.3 1.42 1.42z" />
                </svg>
              </button>
            </div>
            <div class="menu-panel-body">
              <div class={`menu-panel-track ${menuView}`}>
                <div class="menu-view menu-view-root">
                  <button class="menu-item" onClick={handleNewList}>New list</button>
                  <button class="menu-item menu-item-next" onClick={openThemeMenu}>
                    <span class="menu-item-label">Change theme</span>
                    <span class="menu-item-right">
                      <span class="menu-item-meta">{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M9 6l1.4-1.4L18.8 12l-8.4 7.4L9 18l6-6z" />
                      </svg>
                    </span>
                  </button>
                </div>
                <div class="menu-view menu-view-theme">
                  <div class="menu-theme-list">
                    {THEMES.map((item) => (
                      <button
                        key={item}
                        class={`menu-item ${theme === item ? 'menu-item-active' : ''}`}
                        onClick={() => handleThemeSelect(item)}
                      >
                        <span class={`theme-dot ${item}`}></span>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                        {theme === item && (
                          <span class="menu-item-check" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                              <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      Shopix
      <div class="amount"><span>{todos.filter(todo => !todo.complete).length}</span> left</div>
    </h1>
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
