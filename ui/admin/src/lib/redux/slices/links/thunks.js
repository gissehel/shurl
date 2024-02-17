import { createAsyncThunk } from '@reduxjs/toolkit'
import { slice } from './slice'
import { get_all_urls, update_name, update_url, add_url, delete_url } from './api'
import { delay } from './api/tools'

export const loadUrlsAsync = createAsyncThunk('links/loadUrlsAsync', async () => {
    return  await get_all_urls()
})

export const updateNameAsync = createAsyncThunk('links/updateNameAsync', async ({ oldName, newName }) => {
    return await update_name(oldName, newName)
})

export const updateUrlAsync = createAsyncThunk('links/updateUrlAsync', async ({ name, url }) => {
    return await update_url(name, url)
})

export const addNewLinkAsync = createAsyncThunk('links/addNewLinkAsync', async ({ name, url }) => {
    if (name !== '' && url !== '') {
        await add_url(name, url)
    } else {
        throw new Error('empty name or url')
    }
})

export const removeLinkAsync = createAsyncThunk('links/removeLinkAsync', async ({ name }) => {
    return await delete_url(name)
})

export const changeSearch = createAsyncThunk('links/changeSearch', async ({ search }) => {
    await delay(1000)
    return { search }
})