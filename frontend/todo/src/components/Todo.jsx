import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./todo.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const userId = localStorage.getItem("userId")

  console.log(localStorage.getItem("_grecaptcha"));

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/todos/user/${userId}`);
        const todosData = response.data;
        setTasks(todosData)
        console.log(todosData);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    getAllTodos();
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);



  async function addTask() {
    if (newTask.trim() !== "") {
      const response = await axios.post(
        `http://localhost:8081/create/${userId}`,
        {
          body: newTask,
        }
      );
      console.log(response.data);
      setTasks([
        ...tasks,
        { id: response.data.todoId, text: newTask, isEditing: false },
      ]);
      //getAllTodos();
      setNewTask("");
      window.location.reload();
    }
  }

  async function deleteTask(id) {
    await axios.delete(`http://localhost:8081/todos/${userId}/${id}`);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    window.location.reload();
  }

  const handleEdit = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.todoId === id
        ? { ...task, isEditing: true }
        : { ...task, isEditing: false }
    );
    setTasks(updatedTasks);
  };

  async function saveEdit(id, editedTaskText) {
    await axios.put(
      `http://localhost:8081/todos/${userId}/${id}`,{
        body : editedTaskText,        
      }  
    );

    const updatedTasks = tasks.map((task) =>
      task.todoId === id
        ? { ...task, text: editedTaskText, isEditing: false }
        : task
    );

    setTasks(updatedTasks);
    window.location.reload();
  }

  const handleInputChange = (id, value) => {
    const updatedTasks = tasks.map((task) =>
      task.todoId === id ? { ...task, body: value } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
    
    <div className="todo-app">
      <div className="add-task">
        
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask || ""}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <h3>Pending Todo :</h3>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.todoId}>
            {task.isEditing ? (
              <>
                <input
                  type="text"
                  className="edit-text"
                  value={task.body}
                  onChange={(e) => handleInputChange(task.todoId, e.target.value)}
                />
                <button
                  className="save-btn"
                  onClick={() => saveEdit(task.todoId, task.body)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {task.body}
                <div className="task-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(task.todoId)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.todoId)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Todo;