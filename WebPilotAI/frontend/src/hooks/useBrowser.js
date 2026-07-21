import { useContext } from "react";
import { BrowserContext } from "../context/BrowserContext";

const useBrowser=()=>useContext(BrowserContext);

export default useBrowser;