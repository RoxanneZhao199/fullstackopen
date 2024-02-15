import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import NotificationMessage from './components/NotificationMessage'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('success');

  const [showForm, setShowForm] = useState(false);

  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs( blogs )
  //   )
  // }, [])

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // const message = exception.response?.data?.error || 'Login failed';
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const createBlog = async (blogData) => {
    try {
      const newBlog = await blogService.create(blogData);
      setBlogs(blogs.concat(newBlog));
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success');
      setShowForm(false);
    } catch (exception) {
      showNotification('Failed to create a new blog. Please try again.', 'error');
    }
  };

  const handleLike = async (blogToLike) => {
    try {
      const updatedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
        user: blogToLike.user.id
      };
      const returnedBlog = await blogService.update(blogToLike.id, updatedBlog);

      setBlogs(blogs.map(blog => blog.id === blogToLike.id ? returnedBlog : blog));
    } catch (error) {
      console.error('Error updating the blog:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting the blog:', error);
    }
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const showNotification = (message, type = 'success') => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotification(null);
    }, 5000); // Hide notification after 5 seconds
  };

  const toggleFormVisibility = () => {
  setShowForm(!showForm);
  };

  return (
    <div>
      <h2>Blogs</h2>
      <NotificationMessage message={notification} type={notificationType} />
      {!user && loginForm()}
      {user &&
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <button onClick={toggleFormVisibility}>create new blog</button>
          {showForm && (
            <div>
              <BlogForm createBlog={createBlog} />
              <button onClick={() => setShowForm(false)}>cancel</button>
            </div>
          )}
            <Blogs blogs={blogs} onLike={handleLike} onDelete={handleDelete} currentUser={user}/>
          </div>
        }
    </div>
  )
}

export default App
