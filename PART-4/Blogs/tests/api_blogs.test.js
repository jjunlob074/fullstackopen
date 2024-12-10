const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('../utils/blogs_helper');

// Configuración previa a cada test
beforeEach(async () => {
  await helper.setupDatabase();
});

test('blogs are returned as json with correct length', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('blogs have a correct id name', async () => {
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

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

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

  const blogsAtEnd = await helper.blogsInDb();
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

describe('GET /api/blogs/:id', () => {
  test('fetches a blog by ID', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0]; // Selecciona un blog existente para probar

    const response = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.id, blogToView.id);
    assert.strictEqual(response.body.title, blogToView.title);
    assert.strictEqual(response.body.author, blogToView.author);
  });

  test('fails with 404 if blog ID not found', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const response = await api
      .get(`/api/blogs/${nonExistentId}`)
      .expect(404);

    assert.strictEqual(response.body.error, 'Blog not found');
  });

});

describe('Delete a blog', () => {
  test('successfully deletes a blog with valid ID', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

    const ids = blogsAtEnd.map(blog => blog.id);
    assert(!ids.includes(blogToDelete.id), 'Deleted blog is still in the database');
  });

  test('fails with status 204 if blog does not exist', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    await api
      .delete(`/api/blogs/${nonExistentId}`)
      .expect(404);
  });
});

describe('Update likes of a blog', () => {
  test('successfully updates likes with valid ID and data', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedData = { likes: blogToUpdate.likes + 10 };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.likes, updatedData.likes);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id);
    assert.strictEqual(updatedBlog.likes, updatedData.likes);
  });

  test('fails with status 404 if blog does not exist', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    await api
      .put(`/api/blogs/${nonExistentId}`)
      .send({ likes: 10 })
      .expect(404);
  });
});

after(async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed');
});
