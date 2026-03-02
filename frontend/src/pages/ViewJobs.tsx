import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

type Job = {
  id?: number;
  company_name: string;
  job_title: string;
  status: string;
};

function ViewJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get<Job[]>("http://localhost:5000/api/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>All Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id} className="card">
          <p><b>Company:</b> {job.company_name}</p>
          <p><b>Title:</b> {job.job_title}</p>
          <p><b>Status:</b> {job.status}</p>

          <Link to={`/edit/${job.id}`}>
            <button>Edit</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ViewJobs;