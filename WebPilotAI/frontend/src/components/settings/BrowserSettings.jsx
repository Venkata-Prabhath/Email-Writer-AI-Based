import { useState } from "react";

const BrowserSettings = () => {

    const [headless,setHeadless]=useState(true);

    return(

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-white text-xl font-semibold mb-6">

                Browser Settings

            </h2>

            <div className="flex items-center justify-between">

                <span className="text-slate-300">

                    Headless Mode

                </span>

                <input
                    type="checkbox"
                    checked={headless}
                    onChange={()=>setHeadless(!headless)}
                />

            </div>

        </div>

    );

};

export default BrowserSettings;