const TaskProgress = ({ progress=0 }) => {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

            <div className="flex justify-between mb-3">

                <span className="text-white">
                    Progress
                </span>

                <span className="text-blue-400">
                    {progress}%
                </span>

            </div>

            <div className="w-full bg-slate-800 rounded-full h-3">

                <div
                    style={{width:`${progress}%`}}
                    className="bg-blue-600 h-3 rounded-full transition-all"
                />

            </div>

        </div>

    );

};

export default TaskProgress;