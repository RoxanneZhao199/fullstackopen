import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { createSelector } from 'reselect';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/NotificationReducer';

const selectAnecdotes = state => state.anecdotes;
const selectSortedAnecdotes = createSelector(
  [selectAnecdotes],
  (anecdotes) => anecdotes.slice().sort((a, b) => b.votes - a.votes)
);

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    [...state].sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();


  const vote = (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  dispatch(voteAnecdote({ id: anecdote.id, updatedAnecdote }));
  dispatch(displayNotification(`You voted for '${anecdote.content}'`, 5000));
};

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
