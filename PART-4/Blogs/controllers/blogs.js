const express = require('express');
const Blog = require('../models/blog');

const blogsRouter = express.Router();

// Obtener todos los blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// Obtener un blog por ID
blogsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

// Crear un nuevo blog
blogsRouter.post('/', async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      error: 'Title and URL are required',
    });
  }

  const blog = new Blog(req.body);
  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

// Actualizar un blog
blogsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true, context: 'query' }
  );

  if (updatedBlog) {
    res.json(updatedBlog);
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

// Eliminar un blog
blogsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const blogToDelete = await Blog.findById(id);

  if (!blogToDelete) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  await blogToDelete.deleteOne();
  res.status(204).end(); // No Content
});

module.exports = blogsRouter;
