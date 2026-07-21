import * as taskApi from "../api/taskApi";

export const createTask = (task) =>
    taskApi.createTask(task);

export const getTasks = () =>
    taskApi.getTasks();

export const getTask = (id) =>
    taskApi.getTask(id);