import { useAnecdotes, useAnecdotesActions } from "./store"

const App = () => {
  const anecdotes = useAnecdotes()
  const { voteAction, addAction } = useAnecdotesActions()

  const vote = (id) => {
    voteAction(id)
  }

  const generateId = () => Number((Math.random() * 1000000).toFixed(0))
  
  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    addAction({ id: generateId(), content, votes: 0 })
    event.target.reset()
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input data-testid="new" name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
