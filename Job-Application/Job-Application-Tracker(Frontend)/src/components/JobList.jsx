import React, { useEffect, useState } from "react";
import {
  getAllJobs,
  deleteJob,
  getJobsByStatus,
  getJobsByCompany
} from "../services/jobService";

function JobList({ refresh, onEdit }) {

  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchCompany, setSearchCompany] = useState("");

  const loadJobs = () => {

    if (searchCompany.trim() !== "") {
      getJobsByCompany(searchCompany)
        .then(res => setJobs(res.data))
        .catch(err => console.error(err));
      return;
    }

    if (statusFilter === "ALL") {
      getAllJobs()
        .then(res => setJobs(res.data))
        .catch(err => console.error(err));
    } else {
      getJobsByStatus(statusFilter)
        .then(res => setJobs(res.data))
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    loadJobs();
  }, [refresh, statusFilter]);

  const handleDelete = (id) => {
    deleteJob(id)
      .then(() => loadJobs())
      .catch(err => console.error(err));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-200 text-blue-800";
      case "INTERVIEW":
        return "bg-yellow-200 text-yellow-800";
      case "OFFER":
        return "bg-green-200 text-green-800";
      case "REJECTED":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="mt-6">

      <h2 className="text-xl font-semibold mb-4">
        Job Applications
      </h2>

      {/* Search by company */}
      <input
        className="border p-2 mr-3 mb-4 rounded"
        placeholder="Search by company..."
        value={searchCompany}
        onChange={(e) => setSearchCompany(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-3 py-2 rounded mr-3"
        onClick={loadJobs}
      >
        Search
      </button>

      {/* Status filter */}
      <select
        className="border p-2 mb-4 rounded"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="ALL">All</option>
        <option value="APPLIED">Applied</option>
        <option value="INTERVIEW">Interview</option>
        <option value="REJECTED">Rejected</option>
        <option value="OFFER">Offer</option>
      </select>

      <table className="w-full border border-gray-200">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Company</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Applied Date</th>
            <th className="p-2 text-left">Notes</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>

          {jobs.map((job) => (
            <tr key={job.id} className="border-t">

              <td className="p-2">{job.companyName}</td>

              <td className="p-2">{job.role}</td>

              <td className="p-2">
                <span className={`px-2 py-1 rounded ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
              </td>

              <td className="p-2">{job.appliedDate}</td>

              <td className="p-2">{job.notes}</td>

              <td className="p-2">

                <button
                  className="bg-yellow-400 px-3 py-1 mr-2 rounded"
                  onClick={() => onEdit(job)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default JobList;