import { PrismaClient } from "@prisma/client";
import { Todo } from "../entity/todo";
import { ITodoRepository } from "./todo.repository.interface";

export class TodoRepository implements ITodoRepository{
    constructor(private prisma: PrismaClient){}
    
    async create(title: string,  description: string){
        const newTodo = await this.prisma.todo.create({
            data: {
                title,
                description
            }
        })
        return new Todo(newTodo.id, newTodo.title, newTodo.description, newTodo.complete)
    }

    async getAll(): Promise<Todo[]>{
        const todos = await this.prisma.todo.findMany();
        return todos.map(todo => new Todo(todo.id, todo.title, todo.description, todo.complete))
    }

    async getById(id: number): Promise<Todo|null>{
        const todo = await this.prisma.todo.findUnique({
            where: {
                id
            }
        })
        if(!todo){
            return null;
        }
        return new Todo(todo.id, todo.title, todo.description, todo.complete)
    }

    async delete(id: number): Promise<void>{
        await this.prisma.todo.delete({
            where: {
                id
            }
        });
    }
}