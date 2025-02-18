// index.js
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const bodyParse = require("body-parser");

dotenv.config();
const port = process.env.PORT;

// Connect to MongoDB
connectDB();

app.use(bodyParse.json())
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000"],
    })
);
app.use(cookieParser())

// Middleware
app.use(express.json());


// Routes
app.get("/", (req, res) => {
    res.send("Hello World, Backend API");
});


app.use('/api', require('./routes/usersRoute'));
app.use('/api', require('./routes/postRoute'));
app.use('/api', require('./routes/commentRoute'));
app.use('/api', require('./routes/authRoute'));
app.use('/api', require('./routes/profileRoute'));
app.use('/api', require('./routes/topicRoute'));


// Start server
app.listen(port, () => {
  
  console.log("-------------------------")
  console.log(`Server is running on port: ${port}`);
});