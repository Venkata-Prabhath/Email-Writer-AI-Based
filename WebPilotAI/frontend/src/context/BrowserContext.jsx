import { createContext, useState } from "react";

export const BrowserContext=createContext();

const BrowserProvider=({children})=>{

    const[currentUrl,setCurrentUrl]=useState("");

    return(

        <BrowserContext.Provider
            value={{
                currentUrl,
                setCurrentUrl
            }}
        >

            {children}

        </BrowserContext.Provider>

    );

};

export default BrowserProvider;