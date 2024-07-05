import { Request, Response } from "express";
import { TodoService } from "../usecases/todo.service";

export class TodoController {
    constructor(private todoService: TodoService){}

    async create(req: Request, res: Response){
        try{
            const {title, description} = req.body;

            const todo = await this.todoService.create(title, description);
    
            res.status(201).json(todo);
        }catch(e){
            if(e instanceof Error){
                res.status(400).send({message: e.message})
            }else{
                res.status(500).send({message: 'Internal Server Error'})
            }
        }
    }
}