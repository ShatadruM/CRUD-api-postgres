import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandeler from "./middleware/errorHandeler.js";
import createUserTable from "./data/createUserTable.js";
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

// Middleware

app.use(cors());
app.use(express.json());

// Routes
app.use("/api",userRoutes);



//error handeling
app.use(errorHandeler);

//create table at start
createUserTable();

// testing postgeres

app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT current_database()");
        res.send(`Connected to ${result.rows[0].current_database}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



