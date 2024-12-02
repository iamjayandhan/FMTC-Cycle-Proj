const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const standRoutes = require("./routes/standRoutes");
const cycleRoutes = require("./routes/cycleRoutes");
const errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware");

require("./utils/dbOnWatch")();

const app = express();

// const corsOptions = {
//   origin: new RegExp("https://fmtc.vercel.app*", "ig"), // Frontend URL           // Local frontend (Vite)           // Another local frontend (if applicable)      // Your backend server on local network (adjust as needed)
//   methods: ,
//   credentials: true, // Allows cookies to be sent with requests

// };
const corsOptions = {
  origin: "https://fmtc.vercel.app", // Allow only your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  credentials: true, // Allow cookies if required
};

// Apply CORS middleware globally in your Express app
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Helmet for security
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Ensure compatibility with CORS
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/stands", standRoutes);
app.use("/api/v1/cycles", cycleRoutes);

// Error handling middleware
app.use(errorHandlingMiddleware);

// Make sure your server is listening on all network interfaces
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${process.env.PORT}`);
});
