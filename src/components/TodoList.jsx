import { TodoItem } from "./TodoItem";
import { db ,auth} from '../firebase';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot,where } from "firebase/firestore";

export function TodoList({ toggleTodo, deleteTodo }) {
  // Initialize the state to hold the tasks
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    const q = query(collection(db, 'tasks'),where('userId','==',user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // Spread operator to merge document data
      })));
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1 className="header">My Todo List</h1>
      <ul className="list">
        {tasks.length === 0 && "No todos"}
        {tasks.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            completed={todo.completed}
            title={todo.title}
            description={todo.description}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
