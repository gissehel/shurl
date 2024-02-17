'use client'

import { Input } from 'semantic-ui-react'
import styles from './SearchBar.module.css'

const Component = ({ searchValue, searchLoading, onSearchChanged }) => {
    return <Input className={styles.SearchBar} icon='search' value={searchValue} onChange={(event, item) => onSearchChanged(item.value)} loading={searchLoading} />
}

export default Component
