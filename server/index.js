import app from "./app.js"
import { connectDB } from "./database.js";

const PORT = 8080;

connectDB()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})