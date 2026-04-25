import express from "express";
import cors from "cors";
import leadRoutes from "./routes/lead.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});