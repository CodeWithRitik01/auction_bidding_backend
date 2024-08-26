// Import environment variables from the .env file
import "./env.js"

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDb, corsOptions } from "./config.js";

import userRoutes from "./routes/user.routes.js"
import auctionRoutes from "./routes/bidding.routes.js"

const PORT = process.env.PORT || 4000;
const mongoUrl = process.env.MONGOURL;

// Call the function to connect to the MongoDB database using the provided URL
connectDb(mongoUrl)

// Initialize the Express application
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors(corsOptions))

app.use('/api/users', userRoutes)
app.use('/api/auction', auctionRoutes)

// Define a simple GET route for the root URL that sends a "hello" message
app.get("/", (req, res) =>{
    res.send("hello")
})

// Start the server and listen on the defined port, logging a message once the server is running
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})