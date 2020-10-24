import React, {useState, useEffect} from "react";
//These braces : {} are used to access particular components from the package.
//useEffect allows us to run a function everytime a piece of state changes.
import './App.css';
//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //Here setInputText is where we store the user input from the Form i.e Set input text-
  //allows you to change the values stored under Input text.
  //Try putting {inputText} ahead of "E13menT's Todo List" you can see what you type is 
  //displayed on the header.
  //State Logic
  const [inputText, setInputText] =  useState("");
  const [todos, setTodos] = useState([]);
  const [status,setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  //Run Once when the app starts
  useEffect(() => {
    getLocalTodos();
  }, []);
  //Use Effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);//So now this function runs everytime the value of the element inside  these: [] changes.
  //Funtions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };
  return (
    <div className="App">
      <header>
        <h1>E13menT's Todo List</h1>
      </header>
      <Form 
      inputText={inputText}
      todos = {todos}
      setTodos={setTodos}
      setInputText={setInputText}
      setStatus = {setStatus}
      />
      <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos ={todos}/>
    </div>
  );
}

export default App;
