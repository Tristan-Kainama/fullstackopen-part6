import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

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