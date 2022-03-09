import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";

const BASEURL = "http://localhost:3000/tasks/";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(BASEURL);
    const data = await res.json();
    // console.log(data);
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(BASEURL + id);
    const data = await res.json();
    return data;
  };

  // Add task
  const addTask = async (task) => {
    console.log(task);
    const res = await fetch(BASEURL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(task),
    });
    const newTask = await res.json();
    console.log("newTask", newTask);
    console.log("Tasks", [newTask, ...tasks]);

    setTasks([newTask, ...tasks]);
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(BASEURL + id, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
    console.log("Deleted");
  };
  // Delete completed
  const deleteDoneTasks = () => {
    const done = [];
    tasks.map((task) => {
      if (task.done) {
        done.push(task.id);
      }
    });
    console.log(done.toString());
    done.map((elmt) => {
      fetch(BASEURL + elmt, {
        method: "DELETE",
      });
      console.log("Deleted", elmt);
    });
    setTasks(tasks.filter((task) => !done.includes(task.id)));
  };

  // Done
  const handleDone = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {
      ...taskToToggle,
      done: !taskToToggle.done,
    };
    const res = await fetch(BASEURL + id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: data.done } : task
      )
    );
    console.log("new data: ", updatedTask);
    console.log("old data: ", taskToToggle);
  };

  return (
    <div className="container">
      <AddTask addTask={addTask} />{" "}
      <div className="tasks">
        <div className="flex-container">
          <div className="counter">
            <h3>
              {tasks.filter((task) => task.done === true).length}/{tasks.length}
            </h3>
          </div>
          <div className="clearDone">
            <button onClick={deleteDoneTasks} className="btn--clear">
              clear done
            </button>
          </div>
        </div>
        {tasks.length > 0 ? (
          <Tasks tasks={tasks} onDel={deleteTask} handleDone={handleDone} />
        ) : (
          "No Task To Show."
        )}
      </div>
    </div>
  );
}

export default App;
