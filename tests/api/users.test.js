/* global jest test expect */
const request = require('supertest')

const server = require('../../server')

jest.mock('../../db', () => ({
  getUser: (id) => Promise.resolve(
    {id: id, name: 'test user', email: 'test@user.nz'}
  ),
  getUsers: () => Promise.resolve([
    {id: 2, name: 'test user 2', email: 'test2@user.nz'},
    {id: 4, name: 'test user 4', email: 'test4@user.nz'}
  ]),
  addUser: () => Promise.resolve([1]),

  updateUser: () => Promise.resolve(1)
}))

test('/users returns all users', () => {
  const expected = 2
  return request(server)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(res => {
      expect(res.body.users.length).toBe(expected)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('/users/:id returns a user by ID', () => {
  const expected = 'test@user.nz'
  return request(server)
    .get('/users/10')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(res => {
      expect(res.body.user.id).toBe(10)
      expect(res.body.user.email).toBe(expected)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('/users/:id returns a new user', () => {
  const expected = 1
  return request(server)
  .post('/users/addUser')
  .send({ user: { name: '123', email: '123' }})
  .expect(200)
  .then(res => {
    expect(res.body.userIds.id).toBe(expected)
  })
  .catch(err => {
    expect(err).toBeFalsy()
  })
})

test('/users/:id updates a users details', () => {
  const expected = 'You have updated 1 users'
  return request(server)
  .put('/users/updateUser/1')
  .send({ user: { name: '123', email: '123' }})
  //.expect(200)
  .then(res => {
    console.log(res.body)
    expect(res.body.message).toBe(expected)
  })
  .catch(err => {
    expect(err).toBeFalsy()
})
})
