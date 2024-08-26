import mongoose from "mongoose"

// Define a function to connect to the MongoDB database using a given URI
const connectDb = (uri) => {
    mongoose
    .connect(uri, {dbName: "auction_biding"})
    .then((data) => console.log(`connected to DB: ${data.connection.host}`))
    .catch((err) => {
        console.log(err)
    })
}

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
}

export { connectDb, corsOptions };