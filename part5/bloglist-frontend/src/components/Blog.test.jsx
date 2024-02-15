import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser',
    },
  };

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    );
  });

  test('renders title and author', () => {
    expect(component.container).toHaveTextContent('Test Blog Title');
    expect(component.container).toHaveTextContent('Test Author');
  });

  test('does not render URL or likes by default', () => {
    const url = screen.queryByText('http://testurl.com');
    const likes = screen.queryByText('likes');

    expect(url).toBeNull();
    expect(likes).toBeNull();
  });


  test('shows URL and number of likes after view button is clicked', () => {
    const { container } = render(<Blog blog={blog} />);
    const viewButton = container.querySelector('.viewButton');
    fireEvent.click(viewButton);

    const urlElement = container.querySelector('.blogUrl');
    const likesElement = container.querySelector('.blogLikes');

    expect(urlElement).toHaveTextContent(`${blog.url}`);
    expect(likesElement).toHaveTextContent(`${blog.likes}`);
    expect(viewButton).toHaveTextContent('hide');
  });

  test('calls the like button event handler twice when the like button is clicked twice', () => {
    const onLikeMock = jest.fn();

    const { container } = render(<Blog blog={blog} onLike={onLikeMock} />);

    const viewButton = container.querySelector('.viewButton');
    fireEvent.click(viewButton);

    const likeButton = container.querySelector('.likeButton')
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(onLikeMock).toHaveBeenCalledTimes(2);
  });
});
