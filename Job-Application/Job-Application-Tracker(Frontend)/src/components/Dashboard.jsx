import React, { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";

function Dashboard({ refresh }) {

  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0
  });

  useEffect(() => {
    getAllJobs()
      .then(res => {
        const jobs = res.data;

        const counts = {
          total: jobs.length,
          applied: jobs.filter(j => j.status === "APPLIED").length,
          interview: jobs.filter(j => j.status === "INTERVIEW").length,
          offer: jobs.filter(j => j.status === "OFFER").length,
          rejected: jobs.filter(j => j.status === "REJECTED").length
        };

        setStats(counts);
      })
      .catch(err => console.error(err));
  }, [refresh]);

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">

      <div className="bg-gray-200 p-4 rounded text-center">
        <h3 className="font-semibold">Total</h3>
        <p>{stats.total}</p>
      </div>

      <div className="bg-blue-200 p-4 rounded text-center">
        <h3 className="font-semibold">Applied</h3>
        <p>{stats.applied}</p>
      </div>

      <div className="bg-yellow-200 p-4 rounded text-center">
        <h3 className="font-semibold">Interview</h3>
        <p>{stats.interview}</p>
      </div>

      <div className="bg-green-200 p-4 rounded text-center">
        <h3 className="font-semibold">Offer</h3>
        <p>{stats.offer}</p>
      </div>

      <div className="bg-red-200 p-4 rounded text-center">
        <h3 className="font-semibold">Rejected</h3>
        <p>{stats.rejected}</p>
      </div>

    </div>
  );
}

export default Dashboard;