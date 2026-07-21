import { Link } from "react-router-dom";

const NotFound = () => {

    return (

        <div className="flex flex-col justify-center items-center h-screen bg-slate-950">

            <h1 className="text-8xl font-bold text-white">

                404

            </h1>

            <p className="text-slate-400 mt-4">

                Page Not Found

            </p>

            <Link
                to="/dashboard"
                className="mt-8 px-6 py-3 bg-blue-600 rounded-xl text-white"
            >

                Go Home

            </Link>

        </div>

    );

};

export default NotFound;