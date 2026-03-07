import React, { useState } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Dashboard from "./components/Dashboard";

function App() {

  const [refresh, setRefresh] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const refreshJobs = () => {
    setRefresh(prev => !prev);
    setEditJob(null);   // reset edit mode after update
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Job Application Tracker
      </h1>

      <Dashboard refresh={refresh} />

      <JobForm
        refreshJobs={refreshJobs}
        editJob={editJob}
      />

      <JobList
        refresh={refresh}
        onEdit={setEditJob}
      />

    </div>
  );
}

export default App;