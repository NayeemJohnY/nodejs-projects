const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {
    setupDB,
    user1,
    user1_ID,
    user2,
    task1,
    task2,
    task3
} = require('./fixtures/db')

jest.setTimeout(10000)


beforeEach(setupDB)


test('should create task ', async() => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            description: "First Task Read",
            completed: true
        }).expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(true)
})


test('should fetch user task', async() => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)

    console.log(response.body);
    expect(response.body.length).toEqual(2)

})

test('should not able to delete task of another user', async() => {
    const response = await request(app)
        .delete(`/tasks/${task2._id}`)
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)

    response = await request(app)
        .delete(`/tasks/${task1._id}`)
        .set('Authorization', `Bearer ${user2.tokens[0].token}`)
        .send()
        .expect(404)

})