import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const useTask=()=>useContext(TaskContext);

export default useTask;