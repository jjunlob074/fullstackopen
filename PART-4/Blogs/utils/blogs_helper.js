const Blog = require('../models/blog');

// Datos iniciales
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

// Limpia y configura la base de datos
const setupDatabase = async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
};

// Devuelve todos los blogs de la base de datos
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs,
  setupDatabase,
  blogsInDb,
};
