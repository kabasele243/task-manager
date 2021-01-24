const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Makenna',
    email: 'kinshasa@example.com',
    password: 'kinshasa1234!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    jest.testTimeout(10000);
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user',async () => {
    await request(app).post('/users').send({
        name: 'Congo',
        email: 'congo@email.com',
        password: 'Password1234!'
    }).expect(201)
})

test('Should Login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('should not login nonexistent use', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'jvdsdfnsjdfdnsdj'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('./users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].tokens}`)
        .send()
        .expect(200)
})

test('Should not get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer fhebwfilerrtfedhnfwiufhniwefundfuwefneifonsd`)
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticate user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})


