import { Clock } from "lucide-react";

const TaskCard = ({ task }) => {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500 transition">

            <div className="flex justify-between items-center">

                <div>

                    <h3 className="text-white font-semibold">
                        {task.prompt}
                    </h3>

                    <p className="text-slate-500 mt-2">
                        {task.status}
                    </p>

                </div>

                <Clock className="text-blue-400"/>

            </div>

        </div>

    );

};

export default TaskCard;