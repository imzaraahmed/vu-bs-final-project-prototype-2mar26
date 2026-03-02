const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// =============================
// Multer Storage Configuration
// =============================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Allow only PDF, DOC, DOCX
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF/DOC/DOCX files allowed"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});


// 2️⃣ GET Single profile
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM applicants WHERE id = ?",
    [1],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});



// 4️⃣ UPDATE Job - tested by postman and working
router.put("/:id", (req, res) => {
  const  {
        first_name,
        last_name,
        email,
        phone,
        position,
        available_start_date,
        employment_status,
    } = req.body;

   const { id } = req.params;



  const sql = `
    UPDATE applicants
    SET first_name=?, last_name=?, email=?, phone=?, position=?, available_start_date=?, employment_status=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
        first_name,
        last_name,
        email,
        phone,
        position,
        available_start_date,
        employment_status,
        id
      
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Job has been updated successfully",  });
    }
  );
});



module.exports = router;
