'use client'

import * as slices from './slices'

export const reducer = Object.fromEntries(
    Object.values(slices)
        .filter(item => item.slice && item.slice.name && item.slice.reducer)
        .map(
            (item) => [item.slice.name, item.slice.reducer]
        )
)
