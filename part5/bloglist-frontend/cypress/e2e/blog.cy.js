describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

  cy.request('POST', 'http://localhost:3003/api/users', {
    username: 'testuser',
    name: 'Test User',
    password: 'testpassword',
  }).then(() => {
    return cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'testuser',
      password: 'testpassword',
    })
  }).then((res) => {
    localStorage.setItem('token', res.body.token)

    const blogs = [
      { title: 'Blog 1', author: 'Author 1', url: 'http://example.com/1', likes: 5 },
      { title: 'Blog 2', author: 'Author 2', url: 'http://example.com/2', likes: 10 },
      { title: 'Blog 3', author: 'Author 3', url: 'http://example.com/3', likes: 15 },
    ]

    blogs.forEach(blog => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: blog,
      });
    })
  })

  cy.visit('http://localhost:5173/blogs')
  })

  it('Login form is shown', function() {
    cy.contains('Log in').should('be.visible')
    cy.get('form').should('have.length', 1)
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('input[name="username"]').type('testuser')
      cy.get('input[name="password"]').type('testpassword')
      cy.get('button').contains('login').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('input[name="username"]').type('testuser')
      cy.get('input[name="password"]').type('wrongpassword')
      cy.get('button').contains('login').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testuser', password: 'testpassword'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('Test Blog Title')
      cy.get('input[name="author"]').type('Test author')
      cy.get('input[name="url"]').type('http://test.com')
      cy.get('form').submit()
      cy.contains('Test Blog Title')
    })

    it('A user can like a blog', function() {
      cy.contains('Test Blog Title').parent().find('button').contains('like').click()
      cy.contains('Test Blog Title').parent().find('.likeButton').should('contain', '1')
    });

    it('The delete button is visible to the creator', function() {
      cy.contains('Test Blog Title').parent().find('button').contains('Delete').should('be.visible');
    })

    it('Blogs are ordered according to likes', function() {
    cy.visit('http://localhost:5173/blogs');
    cy.get('.blogDetails').eq(0).should('contain', 'Blog 3');
    cy.get('.blog').eq(1).should('contain', 'Blog 2');
  });
  })
})
