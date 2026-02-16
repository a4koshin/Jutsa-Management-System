import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/error-middleware.js";
import userRoutes from "./routes/user-routes.js";
import competitorRoutes from "./routes/competitor-routes.js";
import positionRoutes from "./routes/position-routes.js";
import memberRoutes from "./routes/member-routes.js";
import financeRoutes from "./routes/finance-routes.js";
import SportRoutes from "./routes/sport-routes.js";
import CaawiyeRoutes from "./routes/caawiye-routes.js";
import FormRoutes from "./routes/form-manage.js";
import ActivityRoutes from "./routes/activity-routes.js";
import CandidateRoutes from "./routes/candidate-routes.js";
import cors from "cors";

dotenv.config();
const app = express();

// console.log(dotenv.config(), "Database Connected");
const PORT = process.env.PORT || 7005;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/positions", positionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/competitors", competitorRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/sports", SportRoutes);
app.use("/api/caawiye", CaawiyeRoutes);
app.use("/api/form", FormRoutes);
app.use("/api/activities", ActivityRoutes);
app.use("/api/candidates", CandidateRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/finances", financeRoutes);

// Error handler middleware
app.use(errorHandler);

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
