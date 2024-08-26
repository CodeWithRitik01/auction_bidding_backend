import express from "express"
import { isAuthenticated } from "../middlewares/auth.js"
import { createAuctionItem, deleteAuctionItem, getAllAuctionItem, updateBid } from "../controllers/bidding.controller.js";

const app = express.Router();

app.use(isAuthenticated)

app.post('/additem', createAuctionItem)
app.get('/', getAllAuctionItem)
app.delete('/item/:id', deleteAuctionItem)
app.put('/update/:aucId/:username', updateBid)

export default app;