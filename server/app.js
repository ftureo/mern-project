// const express = require("express") // Before ECMAScript 2015 - ECMA6
import express from "express"; // After ECMAScript 2015 - ECMA6+
import morgan from "morgan";
import testRoutes from "./routes/test.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", testRoutes)

export default app;