import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/NotificationReducer';


const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (anecdote.trim() !== '') {
      dispatch(createAnecdote(anecdote));
      dispatch(displayNotification(`You created a new anecdote: '${anecdote}'`, 5000));
      setAnecdote('');
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="anecdote"
            value={anecdote}
            onChange={(e) => setAnecdote(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;
