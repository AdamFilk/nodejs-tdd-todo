import { ITodoRepository } from "../infrastructure/todo.repository.interface";

export class TodoService {
    constructor(private repository: ITodoRepository){}

    async create(title: string, description: string){
        return this.repository.create(title, description);
    }

    async getAll(){
        return this.repository.getAll();
    }

    async getById(id: number){
        return this.repository.getById(id);
    }

    async delete(id: number){
        return this.repository.delete(id);
    }
}