import React, { useEffect, useState } from "react";
import { createJob, updateJob } from "../services/jobService";

function JobForm({ refreshJobs, editJob }) {

  const [job, setJob] = useState({
    companyName: "",
    role: "",
    status: "APPLIED",
    appliedDate: "",
    notes: ""
  });

  useEffect(() => {
    if (editJob) {
      setJob({
        ...editJob,
        appliedDate: editJob.appliedDate || "",
        status: editJob.status || "APPLIED",
        notes: editJob.notes || ""
      });
    }
  }, [editJob]);

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      companyName: job.companyName,
      role: job.role,
      status: job.status,
      appliedDate: job.appliedDate,
      notes: job.notes
    };

    if (editJob && editJob.id) {
      updateJob(editJob.id, payload)
        .then(() => {
          refreshJobs();
          resetForm();
        })
        .catch(err => console.error(err));
    } else {
      createJob(payload)
        .then(() => {
          refreshJobs();
          resetForm();
        })
        .catch(err => console.error(err));
    }
  };

  const resetForm = () => {
    setJob({
      companyName: "",
      role: "",
      status: "APPLIED",
      appliedDate: "",
      notes: ""
    });
  };

  return (
    <div className="mb-6">

      <h2 className="text-xl font-semibold mb-4">
        {editJob ? "Update Job" : "Add Job Application"}
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          className="border p-2 rounded w-full mb-3"
          name="companyName"
          placeholder="Company Name"
          value={job.companyName}
          onChange={handleChange}
          required
        />

        <input
          className="border p-2 rounded w-full mb-3"
          name="role"
          placeholder="Role"
          value={job.role}
          onChange={handleChange}
          required
        />

        <select
          className="border p-2 rounded w-full mb-3"
          name="status"
          value={job.status}
          onChange={handleChange}
        >
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="REJECTED">Rejected</option>
          <option value="OFFER">Offer</option>
        </select>

        <input
          type="date"
          className="border p-2 rounded w-full mb-3"
          name="appliedDate"
          value={job.appliedDate}
          onChange={handleChange}
          required
        />

        <textarea
          className="border p-2 rounded w-full mb-3"
          name="notes"
          placeholder="Notes (optional)"
          value={job.notes}
          onChange={handleChange}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          {editJob ? "Update Job" : "Add Job"}
        </button>

      </form>

    </div>
  );
}

export default JobForm;