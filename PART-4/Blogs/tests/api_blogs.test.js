const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
]

beforeEach(async () => {
  
  await Blog.deleteMany({})  // Elimina todos los blogs previos
  
  // Crea e inserta los blogs iniciales
  let BlogObject = new Blog(initialBlogs[0])
  await BlogObject.save()
  
  BlogObject = new Blog(initialBlogs[1])
  await BlogObject.save()

})

test('blogs are returned as json with correct length', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(response.body.length, initialBlogs.length)

})

after(async () => {
  await mongoose.connection.close()
  console.log('Mongoose connection closed');
})
