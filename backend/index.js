// index.js
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
const port = process.env.PORT;

// Connect to MongoDB
connectDB();


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



// Start server
app.listen(port, () => {
  
  console.log("-------------------------")
  console.log(`Server is running on port: ${port}`);
});