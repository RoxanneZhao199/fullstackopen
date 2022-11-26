const dummy = (blogs) => {
  return blogs.length + 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((accumulator, object) => {
    return accumulator + object.likes
  }, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  const maxlike = blogs.reduce((acc, obj) => {
    return (acc = acc > obj.likes ? acc : obj.likes)
  }, 0)
  const expectBlog = blogs.find(blog => {
    return blog.likes === maxlike
  })
  return {
    title: expectBlog.title,
    author: expectBlog.author,
    likes: expectBlog.likes
  }
}

const mostBlogs = (array, key) => {
  const groupBy = array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue)
    return result
  }, {})
  // console.log(groupBy)
  const authors = Object.keys(groupBy)
  // console.log(authors)
  const blogsNum = Object.keys(groupBy).map((key) => {
    return groupBy[key].length
  })
  console.log(blogsNum)
  const authorBlogs = {}
  authors.forEach((element, index) => {
    authorBlogs[element] = blogsNum[index]
  })
  console.log(authorBlogs)
  let mostblogs = Object.keys(authorBlogs).sort((a, b) => authorBlogs[b] - authorBlogs[a])[0]
  return {
    author: mostblogs,
    blogs: authorBlogs[mostblogs]
  }
}

const mostLikes = (blogs) => {
  let authorLikes = blogs.reduce((op, { author, likes }) => {
    op[author] = op[author] || 0
    op[author] += likes
    return op
  }, {})
  let mostLikes = Object.keys(authorLikes).sort((a, b) => authorLikes[b] - authorLikes[a])[0]
  return {
    author: mostLikes,
    likes: authorLikes[mostLikes]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
