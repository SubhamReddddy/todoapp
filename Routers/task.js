import { Router } from "express";
import { createNewTask, deleteTask, getMyTask, updateTask } from "../Controllers/task.js";
import { isAuthoriser } from "../Middlewares/auth.js";

const router = Router();

router.post('/new',isAuthoriser,createNewTask);
router.get('/mytasks',isAuthoriser,getMyTask);
router.route('/:id').put(isAuthoriser,updateTask).delete(isAuthoriser,deleteTask);

export default router;