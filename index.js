const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const bodyParser = require("body-parser");
const { incomingRequestLogger } = require("./middleware/index.js");

dotenv.config(); // Load environment variables

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const psychoRouter = require("./routes/psycho");
const skillMappingRouter = require("./routes/skillMapping");
// const jobRouter = require("./routes/job");

app.use(incomingRequestLogger); // Apply request logger middleware

// Set up API routes
app.use("/api/v1", indexRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/psycho", psychoRouter);
app.use("/api/v1/skill-mapping", skillMappingRouter);


// Start the server and connect to MongoDB
const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGOOSE_URI_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Start the Express server
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit process with failure
  }

  // Handle MongoDB connection errors after initial connection
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};

startServer(); // Call the function to start the server
