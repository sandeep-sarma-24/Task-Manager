const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl).then((res) => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

app.use("/auth", authRoutes);


const port = process.env.BACKEND_PORT ;
app.listen(port, () => {
    console.log(`Backend is running on port ${port}`)
});
