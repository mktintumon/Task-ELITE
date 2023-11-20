import React, { useState, useEffect} from "react";
import "./todo.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, isEditing: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEdit = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, isEditing: true }
        : { ...task, isEditing: false }
    );
    setTasks(updatedTasks);
  };

  const saveEdit = (id, editedTaskText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, text: editedTaskText, isEditing: false }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleInputChange = (id, value) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: value } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app">
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <h3>Pending Todo :</h3>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {task.isEditing ? (
              <>
                <input
                  type="text"
                  className="edit-text"
                  value={task.text}
                  onChange={(e) => handleInputChange(task.id, e.target.value)}
                />
                <button
                  className="save-btn"
                  onClick={() => saveEdit(task.id, task.text)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {task.text}
                <div className="task-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(task.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
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
  );
};

export default Todo;
