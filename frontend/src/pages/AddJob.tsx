import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddJob() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
      await axios.post("http://localhost:5000/api/jobs/", job);
      console.log(job);
      navigate("/");
    } catch (err) {
      console.error("Failed to add job:", err);
    }
  };

  return (
    <div>
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="company_name" placeholder="Company" onChange={handleChange} />
        <input name="job_title" placeholder="Job Title" onChange={handleChange} />
        <input name="status" placeholder="Status" onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddJob;