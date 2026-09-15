import { useAnecdotesActions } from '../store'

const AnecdoteForm = () => {
    const { addAction } = useAnecdotesActions()
  
    const add = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        addAction(content)
        event.target.reset()
    }

    return (
        <div>
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

export default AnecdoteForm