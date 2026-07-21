const ChatMessage = ({ message }) => {

    return (

        <div
            className={`rounded-xl p-4 max-w-[75%] ${
                message.role==="user"
                    ? "ml-auto bg-blue-600"
                    : "bg-slate-800"
            }`}
        >

            <p className="text-white">

                {message.content}

            </p>

        </div>

    );

};

export default ChatMessage;