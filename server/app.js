// const express = require("express") // Before ECMAScript 2015 - ECMA6
import express from "express"; // After ECMAScript 2015 - ECMA6+
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));

export default app; 