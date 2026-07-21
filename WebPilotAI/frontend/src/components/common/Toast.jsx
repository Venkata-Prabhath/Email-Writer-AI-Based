const Toast = ({ message }) => {

    if (!message) return null;

    return (

        <div className="fixed bottom-8 right-8 bg-slate-900 border border-slate-700 px-5 py-3 rounded-xl text-white shadow-lg">

            {message}

        </div>

    );

};

export default Toast;