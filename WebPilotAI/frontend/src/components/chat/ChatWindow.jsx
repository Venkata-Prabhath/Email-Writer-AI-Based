import ChatMessage from "./ChatMessage";

const ChatWindow = ({ messages=[] }) => {

    return (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 h-[500px] overflow-y-auto">

            <div className="space-y-4">

                {messages.map((msg,index)=>(

                    <ChatMessage
                        key={index}
                        message={msg}
                    />

                ))}

            </div>

        </div>

    );

};

export default ChatWindow;