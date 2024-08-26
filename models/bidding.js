import mongoose, {Schema} from 'mongoose'


const biddingSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    startTime:{
        type:Date,
        required:true 
    },
    endTime: {
        type:Date,
        required:true
    },
    startPrice: {
         type: Number, 
         required: true
    },
    heighestBid:{
        amount:{
            type: Number,
            default:0
        },
        user:{
            type: String,
           
        }
        
    },
    isActive:{
        type: Boolean,
        default:true
    },
    finally:{
        finalHolder:{
            type: Schema.Types.ObjectId,
            ref:"User",
            default:null
        },
        finalAmount:{
            type:Number,
            default:0
        }
    }
}, {
    timestamps:true
})

export const Bidding = mongoose.model("Bidding", biddingSchema);
