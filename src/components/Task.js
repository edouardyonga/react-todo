import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDel, handleDone }) => {
  return (
    <div className={`task ${task.done ? "reminder" : "reminder-not"}`}>
      <label className="checkbox--cont">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => handleDone(task.id)}
        />
        <span className="checkmark"></span>

        <span className={task.done && "done"}>{task.text}</span>
      </label>
      <FaTimes className="btn--delete" onClick={onDel} />
    </div>
  );
};

export default Task;
