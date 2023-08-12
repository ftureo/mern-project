// const express = require("express") // Before ECMAScript 2015 - ECMA6
import express from "express"; // After ECMAScript 2015 - ECMA6+
import morgan from "morgan";
import fileUpload from "express-fileupload";

import testRoutes from "./routes/test.routes.js";
import booksRoutes from "./routes/books.routes.js";
import userRoutes from "./routes/user.routes.js";
import { createRoles } from "./utils/roles-initializer.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./tmp",
    })
);

createRoles();

app.use("/api", testRoutes);
app.use("/api", booksRoutes);
app.use("/api/auth", userRoutes);

export default app;
