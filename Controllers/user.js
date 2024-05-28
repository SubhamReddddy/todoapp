import { userModel } from "../Models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../Utils/features.js";
import catchAsyncError from "../Utils/catchAsyncError.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
export const getAlluser = catchAsyncError(
    async (req,res)=>{
        const users = await userModel.find();
        res.status(200)
            .json({
                success:true,
                users
            })
    }
)

export const userRegister = catchAsyncError(
    async (req,res,next)=>{

        const { username, email, password } = req.body;
    
        let user = await userModel.findOne({email});
        if(user){
           return next(new ErrorHandler("user already exists!",400));
        }
        else{
            const hashedPassword = bcrypt.hashSync(password,10);
            user =  await userModel.create({ username, email, password:hashedPassword });
            sendCookie(user,res,"Registered successfully",201)
        }
    }
)

export const getMyProfile = catchAsyncError(
    async (req,res)=>{
        res.status(200)
            .json({
                success:true,
                user:req.user
            })
}
)

export const userLogin = catchAsyncError(
    async (req,res,next)=>{
    const { email, password } = req.body;

    const findUser = await userModel.findOne({email}).select("+password");
    if(!findUser){
        return next(new ErrorHandler("register first",404));
    }
    else{
        if(bcrypt.compareSync(password,findUser.password)){
            sendCookie(findUser,res,`welcome back,${findUser.username}`,200)
        }
        else{
            return next(new ErrorHandler("invalide email or password",400));
        }
    }
})

export const userLogout = catchAsyncError(
    (req,res)=>{
        res.status(200).cookie("todoToken",null,{
            httpOnly:true,
            expires:new Date(Date.now())
        }).json({
            success:true,
            message:"logout successfully"
        })
    }
)