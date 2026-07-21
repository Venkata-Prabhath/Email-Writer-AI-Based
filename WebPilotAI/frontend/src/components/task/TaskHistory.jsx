import TaskCard from "./TaskCard";

const TaskHistory = ({ tasks = [] }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-white text-xl font-semibold mb-5">Task History</h2>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-slate-500">No Tasks Found</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id || task._id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskHistory;