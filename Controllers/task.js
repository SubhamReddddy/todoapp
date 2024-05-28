import { taskModel } from "../Models/task.js";
import catchAsyncError from "../Utils/catchAsyncError.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const createNewTask = catchAsyncError(
    async (req,res)=>{
        const {title,description} = req.body;
        await taskModel.create({title,description,user:req.user});
        res.status(201).json({
            success:true,
            message:"task added successfully"
        })
    }
    
)

export const getMyTask = catchAsyncError(
    async (req,res)=>{
        const tasks = await taskModel.find({user:req.user});
        res.status(200).json({
            success:true,
            tasks
        })
    }
)

export const updateTask = catchAsyncError(
    async (req,res,next)=>{
        const {id} = req.params;
        const tasks = await taskModel.findOne({_id:id});
        if(tasks){
            tasks.isCompleted = !tasks.isCompleted
            await tasks.save();
            res.status(200).json({
                success:true,
                message:'task updated successfully'
            })
        }
        else{
            return next(new ErrorHandler("task not found!",404))
        }
    }
)

export const deleteTask = catchAsyncError(
    async (req,res,next)=>{
        const {id} = req.params;
        const task = await taskModel.findById({_id:id})
        if(task){
            await taskModel.deleteOne({_id:id})
            res.status(200).json({
                success:true,
                message:'task deleted successfully'
            })
        }else{
            return next(new ErrorHandler("task not found",404));
        }
    }
)