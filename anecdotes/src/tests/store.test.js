import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react'
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

afterEach(() => {
    cleanup()
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

    it('displays only anecdotes matching the filter', () => {
        useAnecdoteStore.setState({
            anecdotes: [
                { id: 1, content: 'Testing is valuable', votes: 3 },
                { id: 2, content: 'Keep the code simple', votes: 5 },
                { id: 3, content: 'Ship early', votes: 8 }
            ],
            filter: 'code'
        })

        render(createElement(AnecdoteList))

        expect(screen.getByText('Keep the code simple')).toBeTruthy()
        expect(screen.queryByText('Testing is valuable')).toBeNull()
        expect(screen.queryByText('Ship early')).toBeNull()
    })

    it('increases an anecdote vote count when it is voted for', () => {
        useAnecdoteStore.setState({
            anecdotes: [
                { id: 1, content: 'A testable anecdote', votes: 0 }
            ],
            filter: ''
        })

        render(createElement(AnecdoteList))

        fireEvent.click(screen.getByRole('button', { name: 'vote' }))

        expect(screen.getByText(/has 1/)).toBeTruthy()
    })
})