//package imports
import express from "express"
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan" ;
//files imports
import connectDB from "./config/db.js";
//routes import
import testroutes from "./routes/testroutes.js";
import authroutes from "./routes/authroutes.js";
import errormiddleware from "./middlewares/errormiddleware.js";
import jobsRoutes from "./routes/jobsRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config();
//mongodb connection
connectDB();
//rest object
const app = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
//routes
app.use("/api/v1/test", testroutes);
app.use("/api/v1/auth", authroutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes)

//validation middleware
app.use(errormiddleware);
//port
const PORT = process.env.PORT || 4000;
//listen
app.get("/", (req, res) => res.send("<h1>Hello World</h1>"));

app.listen(PORT, () => {
  console.log(
    `node server running in ${process.env.DEV_MODE} mode on port no ${PORT}`
      .bgCyan.white
  );
  console.log(`The URl is http://127.0.0.1:${PORT}/`);
});