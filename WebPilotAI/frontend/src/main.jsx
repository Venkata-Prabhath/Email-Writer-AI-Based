import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./styles/variables.css";
import { AuthProvider } from "./context/AuthContext";
import BrowserProvider from "./context/BrowserContext";
import TaskProvider from "./context/TaskContext";
import ErrorBoundary from "./components/common/ErrorBoundary"; // Import this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <BrowserProvider>
          <TaskProvider>
            <App />
          </TaskProvider>
        </BrowserProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);