const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const bodyParser = require("body-parser");
const { incomingRequestLogger } = require("./middleware/index.js");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const psychoRouter = require("./routes/psycho");
const skillMappingRouter = require("./routes/skillMapping");
const careerRecommendationsRouter = require("./routes/careerRecommendations");
app.use(incomingRequestLogger);

app.use("/api/v1", indexRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/psycho", psychoRouter);
app.use("/api/v1/skill-mapping", skillMappingRouter);
app.use("/api/v1/career-recommendations", careerRecommendationsRouter);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};

startServer();
