'use client'

import { links, useSelector, useDispatch } from '@/lib/redux'
import Component from './SearchBarComponent'

const Container = ({ ...params }) => {
    const dispatch = useDispatch()
    const searchValue = useSelector(links.selectSearchValue)
    const searchLoading = useSelector(links.selectSearchLoading)
    const onSearchChanged = (search) => dispatch(links.changeSearch({ search }))

    return <Component
        searchLoading={searchLoading}
        searchValue={searchValue}
        onSearchChanged={onSearchChanged}
        {...params}
    />
}

export default Container