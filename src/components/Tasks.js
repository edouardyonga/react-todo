import Task from "./Task";
const Tasks = ({ tasks, onDel, handleDone }) => {
  return tasks.map((task, index) => (
    <Task
      key={index}
      task={task}
      onDel={() => onDel(task.id)}
      handleDone = {handleDone}
    />
  ));
};

export default Tasks;
