import * as browserApi from "../api/browserApi";

export const executeCommand = (command) =>
    browserApi.executeBrowserCommand(command);