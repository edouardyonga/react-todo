import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDel, handleDone }) => {
  return (
    <div
      className={`task ${task.completed ? "reminder" : "reminder-not"}`}
    >
      <label className="checkbox--cont">
        <span className={task.completed && "done"}>{task.title}</span>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => handleDone(task.id)}
        />
        <span className="checkmark"></span>
      </label>
      <FaTimes className="btn--delete" onClick={onDel} />
    </div>
  );
};

export default Task;
