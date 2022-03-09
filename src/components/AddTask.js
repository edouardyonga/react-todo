import { useState } from "react";

const AddTask = ({ addTask }) => {
  const [text, setText] = useState("");
  const [valid, setValid] = useState(false);

  const typed = (e) => {
    if (e.target.value.length > 0) {
      setText(e.target.value);
      setValid(true);
    } else {
      setText("");
      setValid(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }
    addTask({ title: text, completed: false });
    setText("");
    setValid(false);
  };

  return (
    <form onSubmit={onSubmit} className="header">
      <input
        type="text"
        placeholder="Add Task"
        value={text}
        onChange={(e) => typed(e)}
      />
      <button
        type="submit"
        className={`btn ${valid ? "btn--out" : "btn--in"}`}
        disabled={!valid}
      >
        Add
      </button>
    </form>
  );
};

export default AddTask;
