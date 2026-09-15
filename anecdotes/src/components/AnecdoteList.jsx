import { useAnecdotes, useAnecdotesActions, useNotificationActions } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { voteAction, removeAction } = useAnecdotesActions()
    const { setMessage } = useNotificationActions()

    const vote = (anecdote) => {
        voteAction(anecdote.id)
        setMessage(`You voted '${anecdote.content}'`)
        setTimeout(() => {
            setMessage('')
        }, 5000)
    }

    const remove = (anecdote) => {
        removeAction(anecdote.id)
        setMessage(`You deleted '${anecdote.content}'`)
        setTimeout(() => {
            setMessage('')
        }, 5000)
    }

    return (
    <div>
        {anecdotes.toSorted((a, b) => b.votes - a.votes).map((anecdote) => (
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                    <button style={{ display: anecdote.votes === 0 ? 'block' : 'none'}} onClick={() => remove(anecdote)}>delete</button>
                </div> 
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        ))}
    </div>
    )
}

export default AnecdoteList