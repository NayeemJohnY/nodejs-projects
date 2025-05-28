const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
    // const jwt = require('jsonwebtoken')
    // const mongoose = require('mongoose')
const { setupDB, user1, user1_ID } = require('./fixtures/db')

jest.setTimeout(10000)

// const userId = new mongoose.Types.ObjectId()
// const user1 = {
//     _id: userId,
//     name: 'John',
//     email: "johnsmith@task-manager.com",
//     password: "john@12345",
//     tokens: [{
//         token: jwt.sign({ _id: userId }, process.env.JWT_SECRET)
//     }]
// }

beforeEach(
    //     async() => {
    //     // console.log("BeforeEach");
    //     // await User.deleteMany()
    //     // await new User(user1).save()
    // }
    setupDB)

// test('Should Sign Up New User', async() => {
//     await request(app).post('/users').send({
//         name: 'John',
//         email: "john@task-manager.com",
//         password: "john@12345"
//     }).expect(201)
// })

test('Should login existing User', async() => {
    await request(app).post('/users/login').send({
        email: user1.email,
        password: user1.password
    }).expect(200)
})

// test('Should not login non existing User', async() => {
//     await request(app).post('/users/login').send({
//         email: user1.email,
//         password: "122222098"
//     }).expect(400)
// })

test('Should get user profile', async() => {
    const response = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)

    console.log(response.body);
    const user = await User.findById(response.body._id)
    expect(user).not.toBeNull()
    expect(response.body.name).toBe("John")
    expect(response.body).toMatchObject({
        name: "John",
    })
})

test("Should upload avatar", async() => {
    await request(app)
        .post("/users/me/avatar")
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .attach('avatars', 'tests/fixtures/fd89b9411bfaa716ebf2d48ca807c518.jpg')
        .expect(200)

    const user = await User.findById(user1_ID)
    expect({}).toEqual({}) // value compare
    expect(user.avatar).toEqual(expect.any(Buffer))
    expect({}).toBe({}) // to Be  ===
})


test("Should update name", async() => {
    const response = await request(app)
        .patch("/users/me")
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({ name: "Hari" })
        .expect(200)
    expect(response.body).toMatchObject({
        name: "Hari",
    })
})

test("Should update invalid field", async() => {
    const response = await request(app)
        .patch("/users/me")
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({ location: "chennai" })
        .expect(400)
})

// test('Should not get user profile with incorrect Auth', async() => {
//     await request(app)
//         .get('/users/me')
//         .set('Authorization', `Bearer ${user1.tokens[0].token} sss`)
//         .send()
//         .expect(401)
// })

// test('Should delete the User', async() => {
//     await request(app)
//         .delete('/users/me')
//         .set('Authorization', `Bearer ${user1.tokens[0].token}`)
//         .send()
//         .expect(200)
// })

// test('Should not delete not authenticated User', async() => {
//     await request(app)
//         .delete('/users/me')
//         .send().expect(401)
// })



// afterEach(() => {
//     console.log("AfterEach");
// })