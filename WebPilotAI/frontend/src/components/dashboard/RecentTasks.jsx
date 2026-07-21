const RecentTasks = ({ tasks = [], loading }) => {

    return (

        <div className="bg-[#141414] rounded-3xl border border-[#2A2A2A] p-8">

            <div className="flex justify-between items-center mb-8">

                <h2 className="text-2xl font-semibold text-white">

                    Recent Tasks

                </h2>

            </div>

            {loading ? (

                <div className="text-gray-500">

                    Loading...

                </div>

            ) : tasks.length === 0 ? (

                <div className="text-center py-20">

                    <h3 className="text-xl text-white">

                        No Tasks Yet

                    </h3>

                    <p className="text-gray-500 mt-3">

                        Execute your first AI task to see history.

                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {tasks.map((task) => (

                        <div

                            key={task.id}

                            className="bg-[#1A1A1A] hover:bg-[#202020] rounded-2xl border border-[#2A2A2A] p-6 transition"

                        >

                            <div className="flex justify-between">

                                <div>

                                    <h3 className="text-white font-semibold">

                                        {task.prompt}

                                    </h3>

                                    <p className="text-gray-500 mt-2">

                                        {task.status}

                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};

export default RecentTasks;