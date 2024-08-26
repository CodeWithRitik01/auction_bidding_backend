import pkg from 'bcryptjs';        
const { compare } = pkg;
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";

const createUser = async(req, res, next) =>{
    try {
        const {username, email, password} = req.body;

        const usernameExists = await User.findOne({username});
        if(usernameExists){
            return next(res.status(400).json("Username already existed"))

        }

        const emailExists = await User.findOne({email});
        if(emailExists){
            return next(res.status(400).json("email already existed"))
        }

        const user = await User.create({username, email, password});


        sendToken(res, user, 201, "User created")
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next)=>{
    const {username, password} = req.body;

    const user = await User.findOne({username});
    if(!user){
        return next(res.status(404).json({message: "No user found"}))
    }

    const isMatch =  compare(password, user.password);
    if(!isMatch){
        return next(res.status(404).json({message: "Invalid password"}))
    }

    sendToken(res, user, 200, `Welcome Back ${user.username}`)
}

const logout = async ( req, res, next ) =>{
    try {
        return res.status(200)
        .cookie("auction-token", "", {...cookieOptions, maxAge:0})
        .json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        return next("error")
    }
}


const updateUserToAdmin = async ( req, res, next) =>{
    try {
        const {key} = req.body;
        console.log(key)
        const user = await User.findById(req.user);

        if(key !== process.env.ADMIN_KEY){
            next(res.status(404).json({message: "Invalid Admin key"}))
        }

        user.isAdmin = true;
        user.save();

        return res.status(201).json({
            success: true,
            user
        });

    } catch (error) {
        next(error);

    }
}

const getAllUsers = async ( req, res, next) =>{
    try {
       
        const users = await User.find();
         const user = await User.findById(req.user);
        return res.status(201).json({
            success: true,
            users,
            user
        });
        } catch (error) {
            return res.status(404).json(error)
        }
}

export { createUser, login, logout , updateUserToAdmin, getAllUsers};