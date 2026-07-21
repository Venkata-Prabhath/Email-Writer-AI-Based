import TaskHistory from "../components/task/TaskHistory";
import TaskProgress from "../components/task/TaskProgress";
import TaskTimeline from "../components/task/TaskTimeline";

const Tasks = () => {

    return (

        <div className="space-y-8">

            <TaskProgress progress={0} />

            <TaskTimeline steps={[]} />

            <TaskHistory tasks={[]} />

        </div>

    );

};

export default Tasks;