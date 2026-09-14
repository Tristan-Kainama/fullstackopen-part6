import { create } from 'zustand'

const useGoodStore = create(set => ({
    good: 0,
    increment: () => set(state => ({ good: state.good + 1 }))
}))

const useBadStore = create(set => ({
    bad: 0,
    increment: () => set(state => ({ bad: state.bad + 1 }))
}))

const useNeutralStore = create(set => ({
    neutral: 0,
    increment: () => set(state => ({ neutral: state.neutral + 1 }))
}))

export const useGood = () => useGoodStore(state => state.good)
export const useBad = () => useBadStore(state => state.bad)
export const useNeutral = () => useNeutralStore(state => state.neutral)

export const useGoodControls = () => useGoodStore(state => state.increment)
export const useBadControls = () => useBadStore(state => state.increment)
export const useNeutralControls = () => useNeutralStore(state => state.increment)