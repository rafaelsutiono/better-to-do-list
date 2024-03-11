import "../App.css";
import { useState } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { signOut } from 'firebase/auth';
import {auth} from "../firebase";



function Todo() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate(); // Create a navigate function


  function logout() {
    signOut(auth).then(() => {+
      // Sign-out successful, redirect to login page
      navigate('/login');
    }).catch((error) => {
      // An error happened.
      console.error("Logout Error:", error);
    });
  }

  function addTodo(title) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  // Function to handle back button click
  const goBack = () => navigate("/homepage");

  // Function to handle profile button click
  const goToProfile = () => navigate("/profile");

  return (
    <>
      <button onClick={goBack} className="bg-yellow-600 hover:bg-yellow-700 text-white opacity-70 font-bold py-1 px-4 rounded ml-3 mr-3 mb-2">Back</button>
      <button onClick={goToProfile} className="bg-yellow-600 hover:bg-yellow-700 text-white opacity-70 font-bold py-1 px-4 rounded mr-3 mb-2">Profile</button>
      <button onClick={logout} className="bg-yellow-600 hover:bg-yellow-700 text-white opacity-70 font-bold py-1 px-4 rounded mr-3 mb-2">Logout</button>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}

export default Todo;

