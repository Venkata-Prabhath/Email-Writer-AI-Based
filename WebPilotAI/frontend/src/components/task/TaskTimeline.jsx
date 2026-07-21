const TaskTimeline = ({ steps=[] }) => {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-white text-xl font-semibold mb-5">
                Execution Timeline
            </h2>

            <div className="space-y-5">

                {steps.length===0
                    ? <p className="text-slate-500">Waiting...</p>
                    : steps.map((step,index)=>(

                        <div
                            key={index}
                            className="flex gap-4"
                        >

                            <div className="w-3 h-3 rounded-full bg-blue-500 mt-2"/>

                            <div>

                                <p className="text-white">
                                    {step}
                                </p>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    );

};

export default TaskTimeline;