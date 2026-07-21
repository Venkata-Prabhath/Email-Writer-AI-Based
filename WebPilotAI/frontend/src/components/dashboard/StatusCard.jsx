const StatusCard = ({ title, status }) => {

    const color =

        status === "Running"

            ? "bg-green-500"

            : status === "Failed"

            ? "bg-red-500"

            : "bg-yellow-500";

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

            <div className="flex justify-between items-center">

                <span className="text-slate-400">

                    {title}

                </span>

                <div className="flex items-center gap-2">

                    <div
                        className={`w-3 h-3 rounded-full ${color}`}
                    />

                    <span className="text-white">

                        {status}

                    </span>

                </div>

            </div>

        </div>

    );

};

export default StatusCard;