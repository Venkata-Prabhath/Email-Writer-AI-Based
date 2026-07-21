import { useEffect } from "react";

const useWebSocket=(url)=>{

    useEffect(()=>{

        const socket=new WebSocket(url);

        socket.onopen=()=>console.log("Connected");

        socket.onclose=()=>console.log("Disconnected");

        return()=>socket.close();

    },[url]);

};

export default useWebSocket;