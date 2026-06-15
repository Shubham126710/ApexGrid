require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const teamRoutes = require("./routes/teamRoutes");
const raceRoutes = require("./routes/raceRoutes");
const componentRoutes = require("./routes/componentRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const databaseRoutes = require("./routes/databaseRoutes");
const authRoutes = require("./routes/authRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const authMiddleware = require("./middleware/authMiddleware");

app.use("/api/auth", authRoutes);
app.use("/api/teams", authMiddleware, teamRoutes);
app.use("/api/races", authMiddleware, raceRoutes);
app.use("/api/components", authMiddleware, componentRoutes);
app.use("/api/shipments", authMiddleware, shipmentRoutes);
app.use("/api/expenses", authMiddleware, expenseRoutes);
app.use("/api/database", authMiddleware, databaseRoutes);
app.use("/api/settings", authMiddleware, settingsRoutes);

app.get("/api/health", (req, res) => {
    res.json({ status: "ApexGrid API Running" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});