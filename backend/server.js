const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

    
// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// catch-all route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));