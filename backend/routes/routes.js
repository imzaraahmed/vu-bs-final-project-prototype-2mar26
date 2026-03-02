const express = require("express");
const router = express.Router();
const db = require("../db");



// 1️⃣ GET All Jobs - tested by postman(zara) and working)
router.get("/", (req, res) => {
  db.query("SELECT * FROM job_application", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
   
  });
});


// 2️⃣ GET Single Job - tested by postman(zara) and working
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM job_application WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});


// 3️⃣ CREATE Job - tested by postman(zara) and working
router.post("/", (req, res) => {
  const {
    company_name,
    job_title,
    status
  } = req.body;

  const sql = `
    INSERT INTO job_application 
    (company_name, job_title, status)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [
      company_name,
      job_title,
      status
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Job created successfully" });
    }
  );
});


// 4️⃣ UPDATE Job - tested by postman and working
router.put("/:id", (req, res) => {
  const {
    company_name,
    job_title,
    status, 
  } = req.body;

   const { id } = req.params;



  const sql = `
    UPDATE job_application
    SET company_name=?, job_title=?, status=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      company_name,
      job_title,
      status,
      id
      
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Job has been updated successfully",  });
    }
  );
});


// 5️⃣ DELETE Job - tested by postmand and working
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM job_application WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Job deleted successfully" });
    }
  );
});

module.exports = router;
