const _ = require('lodash');
const dummy = (blogs) => {
  return blogs.push(1)
}
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  return blogs.reduce((prev, current) => (prev.likes > current.likes)? prev : current)
}
function mostBlogs(blogs) {
  const authorGroups = _.groupBy(blogs, 'author');
  const authorWithMostBlogs = _.maxBy(
    Object.entries(authorGroups), 
    ([author, blogs]) => blogs.length
  );

  if (authorWithMostBlogs) {
    return {
      author: authorWithMostBlogs[0],
      blogs: authorWithMostBlogs[1].length,
    };
  }

  return null;
}

function mostLikes(blogs) {
  const authorGroups = _.groupBy(blogs, 'author');
  const authorWithMostLikes = _.maxBy(
    Object.entries(authorGroups), 
    ([author, blogs]) => _.sumBy(blogs, blog => blog.likes) 
  );

  if (authorWithMostLikes) {
    return {
      author: authorWithMostLikes[0],
      likes: _.sumBy(authorWithMostLikes[1], blog => blog.likes) 
    };
  }

  return null;
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
  }