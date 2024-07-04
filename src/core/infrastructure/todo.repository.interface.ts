import { Todo } from "../entity/todo";

export interface ITodoRepository {
    create(title: string, description: string) : Promise<Todo>;
    getAll(): Promise<Todo[]>;
    getById(id: number) : Promise<Todo|null>;
    delete(id: number) : Promise<void>;
}