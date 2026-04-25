import express from "express";
import pool from "../db.js";
import { getLeads, updateleads } from "../services/load.service.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { name, phone, email, budget, location, source } = req.body;
    if (!name || !phone || !email || !budget || !location || ! source) {
      return res.status(400).json({ error: "Name and phone are required" });
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
    }
    const result = await pool.query(
      `INSERT INTO leads (name, phone, email, budget, location, source)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, phone, email, budget, location, source]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM leads ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const leads = await getLeads(req.query);
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const updatedLead = await updateleads(id, status);

    if (!updatedLead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.json(updatedLead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;