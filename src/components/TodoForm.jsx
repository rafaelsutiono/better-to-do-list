import { useState } from "react";
import { db, auth } from '../firebase'; // Ensure auth is exported from your Firebase setup
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export function TodoForm({ addTodo }) {
  const [newItem, setNewItem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if a user is logged in
    if (auth.currentUser) {
      try {
        await addDoc(collection(db, 'tasks'), {
          title: newItem,
          completed: false,
          created: Timestamp.now(),
          userId: auth.currentUser.uid // Store the current user's ID with the todo item
        });
        setNewItem(""); // Clear the input after successful submission
      } catch (err) {
        alert(err);
      }
    } else {
      alert("No user is logged in.");
    }
  };

  return (
    <div>
    <form className="new-item-form">
      <div className="form-row">
      <input
        type="text"
        id="item"
        placeholder="Add Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        style={{
          backgroundColor: "#d5e3f0",
          borderRadius: "20px",
          color: "black" // Set the text color to black
        }}
        className="rounded"
      />

      </div>
      <button className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 border-b-4  hover:border-yellow-700 rounded" style={{ borderRadius: "20px" }} onClick={handleSubmit}>
        Add
      </button>
    </form>
  </div>
  );
}
