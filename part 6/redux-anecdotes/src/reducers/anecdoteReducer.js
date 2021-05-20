import anecdotesService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.payload;
    case "VOTE":
      let anecdoteToVote = state.find(
        (anecdote) => anecdote.id === action.payload.id
      );
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((a) => (a.id === action.payload.id ? votedAnecdote : a));
    case "NEW_ANECDOTE":
      return [...state, action.payload];
    case "ORDER_BY_VOTES":
      let sortedAnecdotes = [...state].sort((a, b) => b.votes - a.votes);
      return sortedAnecdotes;
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      payload: anecdotes,
    });
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdotesService.vote(id);
    dispatch({
      type: "VOTE",
      payload: { id },
    });
  };
};

export const newAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(anecdote);
    dispatch({
      type: "NEW_ANECDOTE",
      payload: newAnecdote,
    });
  };
};

export const orderByVotes = () => {
  return {
    type: "ORDER_BY_VOTES",
  };
};

export default reducer;
