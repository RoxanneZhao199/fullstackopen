import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('calls the event handler with the right details when a new blog is created', () => {
    const createBlogMock = jest.fn();

    render(<BlogForm createBlog={createBlogMock} />);

    fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'Testing React Applications' } });
    fireEvent.change(screen.getByLabelText('Author:'), { target: { value: 'Roxanne' } });
    fireEvent.change(screen.getByLabelText('URL:'), { target: { value: 'https://example.com/blogs/testing-react' } });

    fireEvent.submit(screen.getByText('create'));

    expect(createBlogMock).toHaveBeenCalledWith({
      title: 'Testing React Applications',
      author: 'Roxanne',
      url: 'https://example.com/blogs/testing-react',
    });
  });
})
