import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Define type locally
  type Job = {
    company_name: string;
    job_title: string;
    status: string;
  };

  const [job, setJob] = useState<Job>({
    company_name: "",
    job_title: "",
    status: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        const res = await axios.get<Job[]>(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data[0]);
      } catch (err) {
        console.error("Failed to fetch job:", err);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}`, job);
      navigate("/");
    } catch (err) {
      console.error("Failed to update job:", err);
    }
  };

  return (
    <div>
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="company_name" value={job.company_name} onChange={handleChange} />
        <input name="job_title" value={job.job_title} onChange={handleChange} />
        <input name="status" value={job.status} onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditJob;