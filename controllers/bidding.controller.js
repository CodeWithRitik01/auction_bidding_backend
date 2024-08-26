import { Bidding } from "../models/bidding.js";
import { User } from "../models/user.js";
import schedule from "node-schedule"

const createAuctionItem = async(req, res, next) =>{
    try {
        const {name, startTime, endTime, startPrice} = req.body;
        const user = req.user
        const admin = await User.findById(user);

        if(admin.isAdmin === false){
            return next(res.status(400).json("You are not authorized"))
        }

        const BidItem = await Bidding.create({name, startTime, endTime, startPrice});
        schedule.scheduleJob(endTime, async(req, res) =>{
             BidItem.isActive = false;
             BidItem.heighestBid.amount = BidItem.finally.finalAmount
             BidItem.heighestBid.user = BidItem.finally.finalHolder
             await BidItem.save();
             console.log("auction ended")
        })
        return res.status(201).json({
            success: true,
            BidItem
        });


    } catch (error) {
        next(error);
    }
}

const getAllAuctionItem = async(req, res, next) =>{
    try {
       const item = await Bidding.find();
        return res.status(201).json({
            success: true,
            item
        });


    } catch (error) {
        next(error);
    }
}

const deleteAuctionItem = async(req, res, next) =>{
    console.log(req.params)
    try {
        const {id} = req.params;
        console.log(id)
        const item = await Bidding.deleteOne({_id:id});
        
        return res.status(201).json({
            success: true,
            message:"item deleted"
        });

        
    } catch (error) {
        next(error);
    }
}

const updateBid = async(req, res, next) =>{
    try {
        const {aucId, username } = req.params;
        const {amount} = req.body;
       
        const item = await Bidding.findOne({ _id: aucId });
        console.log(item)
        console.log(aucId, username, amount)

        if(item.startPrice > amount && item.heighestBid.amount > amount){
            return next(res.status(400).json("Amount should be greater then initial amount"))

        }

        item.heighestBid.amount = amount;
        item.heighestBid.user = username;

        await item.save();
        
        return res.status(201).json({
            success: true,
            item
        });

        
    } catch (error) {
        next(error);
    }
}


export {createAuctionItem, getAllAuctionItem, deleteAuctionItem, updateBid}