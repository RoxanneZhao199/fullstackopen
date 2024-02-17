import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdote'


// const getId = () => (100000 * Math.random()).toFixed(0);

// const initialState = [
//   { content: 'If it hurts, do it more often', id: getId(), votes: 0 },
//   { content: 'Adding manpower to a late software project makes it later!', id: getId(), votes: 0 },
//   { content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', id: getId(), votes: 0 },
//   { content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', id: getId(), votes: 0 },
//   { content: 'Premature optimization is the root of all evil.', id: getId(), votes: 0 },
//   { content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', id: getId(), votes: 0 },
// ];

export const voteAnecdote = createAsyncThunk(
  'anecdotes/vote',
  async ({ id, updatedAnecdote }) => {
    const response = await anecdoteService.vote(id, updatedAnecdote);
    return response;
  }
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(voteAnecdote.fulfilled, (state, action) => {
        const updatedAnecdote = action.payload;
        const index = state.findIndex(anecdote => anecdote.id === updatedAnecdote.id);
        if (index !== -1) {
          state[index] = updatedAnecdote;
        }
      });
  }
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = createAsyncThunk(
  'anecdotes/createAnecdote',
  async (content, { dispatch }) => {
    const newAnecdote = await anecdoteService.createNew(content);
    return newAnecdote;
  }
);

export default anecdoteSlice.reducer;
