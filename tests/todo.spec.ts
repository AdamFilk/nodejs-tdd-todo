import { PrismaClient } from "@prisma/client";
import { TodoRepository } from "../src/core/infrastructure/todo.repository";
import { TodoService } from "../src/core/usecases/todo.service";

const prisma = new PrismaClient();
const todoRepo = new TodoRepository(prisma);
const todoService = new TodoService(todoRepo);

beforeAll(async() => {
    await prisma.$connect();
})

beforeEach(async() => {
    await prisma.todo.deleteMany();
})

afterAll(async () => {
    await prisma.todo.deleteMany();
    await prisma.$disconnect();
})

describe('Create Todo', () => {
    it('Should Create a new todo', async () => {
        const todo = await todoService.create('Task 1','This is tasks 1 description');
        expect(todo.title).toBe('Task 1');
        expect(todo.description).toBe('This is tasks 1 description')
        expect(todo.completed).toBe(false)
    })

    it('Should get all', async() => {
        await todoService.create('Task 1','This is tasks 1 description');
        await todoService.create('Task 2','This is tasks 2 description');
        const todos = await todoService.getAll();
        expect(todos.length).toBe(2);
    })

    it('Should get by id', async() => {
        const created = await todoService.create('Task 1','This is tasks 1 description');
        const todo = await todoService.getById(created.id);
        expect(created).not.toBe(null);
        if(!todo) return;
        expect(todo.title).toBe(created.title);
        expect(created.description).toBe(created.description);
    })

    it('Should return null if not exists', async() => {
        const todo = await todoService.getById(1);
        expect(todo).toBeNull();
    })

    it('Should delete with id', async() => {
        const created = await todoService.create('Task 1','This is tasks 1 description');
        await todoService.delete(created.id);
        const todo = await todoService.getById(created.id);
        expect(todo).toBeNull();
    })
})