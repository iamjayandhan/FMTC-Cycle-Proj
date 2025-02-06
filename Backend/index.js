const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes.js");
const standRoutes = require("./routes/standRoutes");
const cycleRoutes = require("./routes/cycleRoutes");
const errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware");

require("./utils/dbOnWatch")();

const app = express();

// app.use((req, res, next) => {
//   const allowedOrigins = ["http://localhost:5173", "https://fmtc-cycle-proj-ue83-b8ey3xxfu-iamjayandhans-projects.vercel.app", "https://fmtc-cycle-proj-ue83-git-main-iamjayandhans-projects.vercel.app"];
//   const origin = req.headers.origin;

//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
//   }

//   if (req.method === "OPTIONS") {
//     return res.status(200).end(); // Respond to preflight requests
//   }

//   next();
// });

// const corsOptions = {
//   origin: new RegExp("https://fmtc.vercel.app*", "ig"), // Frontend URL           // Local frontend (Vite)           // Another local frontend (if applicable)      // Your backend server on local network (adjust as needed)
//   methods: ,
//   credentials: true, // Allows cookies to be sent with requests

// };


const allowedOrigins = [
  "http://localhost:5173",
  "https://fmtc-cycle-proj-fe.vercel.app",
  "https://fmtc-cycle-proj-fe-iamjayandhans-projects.vercel.app/",
  "https://fmtc-cycle-proj-fe-git-main-iamjayandhans-projects.vercel.app/",
];


const corsOptions = {
  origin: (req, callback) => {
    console.log(allowedOrigins)
    console.log(req);
    const requestOrigin = req;
    if (allowedOrigins.includes(requestOrigin)) {
      callback(null, requestOrigin); // Allow the request's origin
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
  // origin: 'http://localhost:5173',
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies if required
};



// Apply CORS middleware globally in your Express app
app.use(cors(corsOptions));
app.options("/api/v1/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});
// app.options("*", cors(corsOptions)); 

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
