const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

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
];

beforeEach(async () => {
  await Blog.deleteMany({});  // Elimina todos los blogs previos
  await Blog.insertMany(initialBlogs);  // Inserta los blogs iniciales de una vez
});

test('blogs are returned as json with correct length', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test('blogs has a correct id name', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert('id' in response.body[0], 'id property is missing');
});

test('a new blog post is added via POST request', async () => {
  const newBlog = {
    title: "Test Driven Development",
    author: "Kent Beck",
    url: "https://example.com/tdd",
    likes: 10,
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await Blog.find({});
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);

  const blogTitles = blogsAtEnd.map(blog => blog.title);
  assert(blogTitles.includes(newBlog.title));
});

test('likes defaults to 0 if missing', async () => {
  const newBlog2 = {
    title: "Test Blog without Likes",
    author: "Author",
    url: "https://example.com/blog-without-likes",
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await Blog.find({});
  const addedBlog = blogsAtEnd.find(blog => blog.id === response.body.id);
  assert.strictEqual(addedBlog.likes, 0);
});

test('blog creation fails with status 400 if title or url is missing', async () => {
  const blogWithoutTitle = {
    author: "Author",
    url: "https://example.com/no-title",
  };

  const blogWithoutUrl = {
    title: "Blog without URL",
    author: "Author",
  };

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400);

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400);
});

after(async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed');
});
