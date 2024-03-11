import "../App.css";
import { useState } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Todo() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate(); // Create a navigate function

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
      <button onClick={goBack} className="back-button">Back</button>
      <button onClick={goToProfile} className="profile-button">Profile</button>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}

export default Todo;

