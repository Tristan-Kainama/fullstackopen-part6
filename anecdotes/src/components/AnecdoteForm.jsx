import { useAnecdotesActions, useNotificationActions } from '../store'

const AnecdoteForm = () => {
    const { addAction } = useAnecdotesActions()
    const { setMessage } = useNotificationActions()

    const add = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        addAction(content)
        setMessage(`'${content}' anecdote has been added`)
        setTimeout(() => {
            setMessage('')
        }, 5000)
        event.target.reset()
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div>
                    <input data-testid="new" name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm