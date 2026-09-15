import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    addAction: async (content) => {
      const newAnecdote = await anecdoteService.addNew(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    voteAction: (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = { ...anecdote, votes: anecdote.votes + 1 }

      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? updated : a)
      }))

      return anecdoteService.update(id, updated)
    },
    removeAction: async (id) => {
      await anecdoteService.remove(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    }
  }
}))

const useNotificationStore = create((set) => ({
  message: '',
  actions: {
    setMessage: value => set(() => ({ message: value }))
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)

  return anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
}
export const useFilter = () => useAnecdoteStore(state => state.filter)
export const useNotification = () => useNotificationStore(state => state.message)

export const useAnecdotesActions = () => useAnecdoteStore(state => state.actions)
export const useNotificationActions = () => useNotificationStore(state => state.actions)