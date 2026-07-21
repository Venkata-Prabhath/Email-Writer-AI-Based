import { Send } from "lucide-react";

const ChatInput = ({
    value,
    onChange,
    onSend
}) => {

    return (

        <div className="flex gap-3">

            <input
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                placeholder="Ask WebPilot..."
                className="flex-1 bg-slate-800 rounded-xl px-4 py-3 text-white outline-none"
            />

            <button
                onClick={onSend}
                className="bg-blue-600 hover:bg-blue-700 rounded-xl px-5"
            >

                <Send className="text-white"/>

            </button>

        </div>

    );

};

export default ChatInput;