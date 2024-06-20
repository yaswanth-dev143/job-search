//Api ddocumentation
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from 'swagger-jsdoc'
//package imports
import express from "express"
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan" ;
//security Packages
import helmet from "helmet";
import xss from 'xss-clean'
//files imports
import connectDB from "./config/db.js";
//routes import
import testroutes from "./routes/testroutes.js";
import authroutes from "./routes/authroutes.js";
import errormiddleware from "./middlewares/errormiddleware.js";
import jobsRoutes from "./routes/jobsRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { version } from 'mongoose';

dotenv.config();
//mongodb connection
connectDB();

//swagger API config

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Portal Application API',
      version: '1.0.0',
      description: 'Node Express Job Portal Application'
    },
    servers: [
      {
        url: 'http://localhost:4000'
      },
    ],
  },
  apis:['./routes/*.js'],
};

const spec = swaggerDoc(options)

//rest object
const app = express();
//middlewares
app.use(helmet())
app.use(xss())
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
//routes
app.use("/api/v1/test", testroutes);
app.use("/api/v1/auth", authroutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes)

//Homeroute
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec))

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
