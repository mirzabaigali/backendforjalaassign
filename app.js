require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/connectDB.js");
const port = process.env.PORT;
const userRoutes = require("./routes/userRoutes.js");

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("I am live"));

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
