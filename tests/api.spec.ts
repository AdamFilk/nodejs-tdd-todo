import request from 'supertest'
import app from '../src/app'

describe('API', () => {
    it('should create todo',async () => {
        const res = await request(app).post('/todos').send({ title: 'Todo 1', description: 'Description 1'})
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Todo 1')
        expect(res.body.description).toBe('Description 1')
    })

    // it('should return todo with id',async () => {
    //     const res = await request(app).post('/todos').send({ title: 'Todo 1', description: 'Description 1'})
    //     const res2 = await request(app).get('/todos/'+ res.body.id)
    //     expect(res2.status).toBe(200);
    //     expect(res2.body.id).toBe(res.body.id);
    //     expect(res2.body.title).toBe(res.body.title)
    //     expect(res2.body.description).toBe(res.body.description)
    // })
})