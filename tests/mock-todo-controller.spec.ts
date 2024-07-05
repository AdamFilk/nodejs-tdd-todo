import { Request, Response } from "express";
import { TodoController } from "../src/core/controllers/todo.controller";
import { ITodoRepository } from "../src/core/infrastructure/todo.repository.interface";
import { TodoService } from "../src/core/usecases/todo.service";

class MockTodoRepository implements ITodoRepository {
    create = jest.fn();
    getAll= jest.fn();
    getById= jest.fn();
    delete= jest.fn();
}

describe('TodoController', () => {
    let todoRepository : MockTodoRepository;
    let todoService : TodoService;
    let todoController : TodoController;

    let req : Partial<Request>;
    let res : Partial<Response>;

    beforeEach(() => {
        todoRepository = new MockTodoRepository();
        todoService = new TodoService(todoRepository);
        todoController = new TodoController(todoService);
        req = {};
        res = {
            status : jest.fn().mockReturnThis(),
            json : jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(), // Ensure send is mocked
            end : jest.fn().mockReturnThis(),
        }
    })

    describe('Create todo', () => {
        //success
        it('should create todo', async () => {
            const todo = {id: 1, title: 'title', description: 'description'}

            todoRepository.create.mockResolvedValue(todo);
            
            req.body = {title: 'title', description: 'description'};
    
            await todoController.create(req as Request, res as Response);
    
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(todo)
        })
        //fail case
        it('should fail todo', async () => {
            const error = new Error('Mock Error');

            todoRepository.create.mockRejectedValue(error);
            
            req.body = {title: 'title', description: 'description'};
    
            await todoController.create(req as Request, res as Response);
    
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({message: error.message})
        })
    })
})