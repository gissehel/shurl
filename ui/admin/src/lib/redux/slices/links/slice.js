import { createSlice } from '@reduxjs/toolkit'
import { loadUrlsAsync, updateNameAsync, updateUrlAsync, addNewLinkAsync, removeLinkAsync } from './thunks'

const initialState = {
    urlLoadStatus: 'idle',
    links: [],
    linksView: [],
    urlsLoading: false,
    urlsLoaded: false,
    editData: null,
    editLine: null,
    editType: null,
    currentPage: 0,
    pageCount: 0,
    pageSize: 10,
    newName: '',
    newUrl: '',
    newLinkWaiting: {},

}

const getLinksView = (state) => {
    const { links, editLine, editType } = state
    const { currentPage, pageSize } = state
    const start = currentPage * pageSize
    const linksView = links.slice(start, start + pageSize).map((link, index) => {
        if (index + start === editLine) {
            return { ...link, ...(editType === 'name' ? { nameEditable: true } : { urlEditable: true }) }
        }
        return link
    })
    state.pageCount = Math.ceil(links.length / pageSize)
    state.linksView = linksView
}

const editItem = (state, action, itemType) => {
    const { currentPage, line } = action.payload
    const { pageSize } = state
    state.editLine = currentPage * pageSize + line
    state.editType = itemType
    state.editData = state.links[state.editLine][itemType]
    getLinksView(state)
}

export const slice = createSlice({
    name: 'links',
    initialState,
    reducers: {
        editName: (state, action) => editItem(state, action, 'name'),
        editUrl: (state, action) => editItem(state, action, 'url'),
        editChanged: (state, action) => { state.editData = action.payload },
        editCanceled: (state) => {
            state.editLine = null
            state.editType = null
            state.editData = null
            getLinksView(state)
        },
        changePage: (state, action) => {
            const { page } = action.payload
            if (page !== state.currentPage && page >= 0 && page < state.pageCount) {
                state.currentPage = page
                getLinksView(state)
            }
        },
        editNewName: (state, action) => { state.newName = action.payload },
        editNewUrl: (state, action) => { state.newUrl = action.payload },
        resetNewLink: (state) => {
            state.newName = ''
            state.newUrl = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUrlsAsync.pending, (state) => {
                state.urlLoadStatus = 'loading'
                state.urlsLoading = true
            })
            .addCase(loadUrlsAsync.fulfilled, (state, action) => {
                state.urlLoadStatus = 'idle'
                state.urlsLoading = false
                state.urlsLoaded = true
                // console.log('loadUrlsAsync.fulfilled', { action })
                if (action && action.payload) {
                    state.links = action.payload
                    getLinksView(state)
                }
            })
            .addCase(loadUrlsAsync.rejected, (state, action) => {
                state.urlLoadStatus = 'failed'
                state.urlsLoading = false
                state.urlsLoaded = true
            })

        builder
            .addCase(updateNameAsync.pending, (state, action) => {
            })
            .addCase(updateNameAsync.fulfilled, (state, action) => {
                const { oldName, newName } = action.meta.arg
                const { editLine, links } = state
                if (editLine !== null && links[editLine].name === oldName) {
                    links[editLine].name = newName
                    state.editLine = null
                    state.editType = null
                    state.editData = null
                    getLinksView(state)
                }
            })
            .addCase(updateNameAsync.rejected, (state, action) => {
                state.editLine = null
                state.editType = null
                state.editData = null
                getLinksView(state)
            })
            
        builder
            .addCase(updateUrlAsync.pending, (state, action) => {
            })
            .addCase(updateUrlAsync.fulfilled, (state, action) => {
                const { name, url } = action.meta.arg
                const { editLine, links } = state
                if (editLine !== null && links[editLine].name === name) {
                    links[editLine].url = url
                    state.editLine = null
                    state.editType = null
                    state.editData = null
                    getLinksView(state)
                }
            })
            .addCase(updateUrlAsync.rejected, (state, action) => {
                state.editLine = null
                state.editType = null
                state.editData = null
                getLinksView(state)
            })
            
        builder
            .addCase(addNewLinkAsync.pending, (state, action) => {
                const { name, url } = action.meta.arg
                state.newLinkWaiting[name] = {name, url}
                state.newName = ''
                state.newUrl = ''
            })
            .addCase(addNewLinkAsync.fulfilled, (state, action) => {
                const { name, url } = action.meta.arg
                delete state.newLinkWaiting[name]
                const { links } = state
                links.push({ name, url })
                getLinksView(state)
            })
            .addCase(addNewLinkAsync.rejected, (state, action) => {
                const { name, url } = action.meta.arg
                delete state.newLinkWaiting[name]
            })

        builder
            .addCase(removeLinkAsync.pending, (state, action) => {
            })
            .addCase(removeLinkAsync.fulfilled, (state, action) => {
                const { name } = action.meta.arg
                const { links } = state
                const index = links.findIndex((link) => link.name === name)
                if (index >= 0) {
                    links.splice(index, 1)
                    getLinksView(state)
                }
            })
            .addCase(removeLinkAsync.rejected, (state, action) => {
            })
    },
})
