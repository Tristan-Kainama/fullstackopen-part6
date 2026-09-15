import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { render, screen } from '@testing-library/react'
import { createElement } from 'react'
import AnecdoteList from '../components/AnecdoteList'

vi.mock('../services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        addNew: vi.fn(),
        update: vi.fn(),
        remove: vi.fn()
    }
}))

import anecdoteService from '../services/anecdotes'
import { useAnecdoteStore, useAnecdotes, useAnecdotesActions } from '../store'

beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
    vi.clearAllMocks()
})

describe('useAnecdotesActions', () => {
    it ('initialize load anecdotes from service', async () => {
        const mockAnecdotes = [{ id: 1, content: 'To be or not to be', votes: 0 }]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdotesActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdotesResults } = renderHook(() => useAnecdotes())
        expect(anecdotesResults.current).toEqual(mockAnecdotes)
    })
})

describe('AnecdoteList', () => {
    it('displays anecdotes in descending order by votes', () => {
        useAnecdoteStore.setState({
            anecdotes: [
                { id: 1, content: 'Least popular', votes: 1 },
                { id: 2, content: 'Most popular', votes: 8 },
                { id: 3, content: 'Middle popularity', votes: 4 }
            ],
            filter: ''
        })

        render(createElement(AnecdoteList))

        expect(screen.getAllByText(/popular/).map(anecdote => anecdote.textContent)).toEqual([
            'Most popular',
            'Middle popularity',
            'Least popular'
        ])
    })
})