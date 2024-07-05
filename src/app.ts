import { PrismaClient } from '@prisma/client';
import express from 'express'
import { TodoService } from './core/usecases/todo.service';
import { TodoRepository } from './core/infrastructure/todo.repository';
import { TodoController } from './core/controllers/todo.controller';


const app = express();
const prisma = new PrismaClient();
const todoRepository = new TodoRepository(prisma);
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

app.use(express.json());

app.post('/todos',async (req,res) => {
    await todoController.create(req,res);
})

app.get('/todos',(req,res) => {})

export default app;