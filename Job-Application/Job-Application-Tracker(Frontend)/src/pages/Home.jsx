import React from "react";
import { useState } from "react";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";

function Home() {

  const [refresh, setRefresh] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const refreshJobs = () => {
    setRefresh(!refresh);
    setEditJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-center mb-8">
        Job Application Tracker
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">

        <JobForm
          refreshJobs={refreshJobs}
          editJob={editJob}
        />

        <JobList
          refresh={refresh}
          onEdit={setEditJob}
        />

      </div>

    </div>
  );
}

export default Home;