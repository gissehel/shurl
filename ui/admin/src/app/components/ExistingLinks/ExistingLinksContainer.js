'use client'

import { links, useSelector, useDispatch } from '@/lib/redux'
import Component from './ExistingLinksComponent'

const Container =  ({ ...params }) => {
    const dispatch = useDispatch()
    const urlsLoading = useSelector(links.selectUrlsLoading)
    const urlsLoaded = useSelector(links.selectUrlsLoaded)
    if (!urlsLoaded && !urlsLoading) {
        dispatch(links.loadUrlsAsync())
    }
    const linksView = useSelector(links.selectView)
    const currentPage = useSelector(links.selectCurrentPage)
    const pageCount = useSelector(links.selectPageCount)
    const onClickName = (currentPage, line) => dispatch(links.slice.actions.editName({ currentPage, line }))
    const onClickUrl = (currentPage, line) => dispatch(links.slice.actions.editUrl({ currentPage, line }))

    const editData = useSelector(links.selectEditData)
    const onEditChanged = (value) => dispatch(links.slice.actions.editChanged(value))
    const onEditCanceled = () => dispatch(links.slice.actions.editCanceled())
    const onUpdateName = (oldName, newName) => dispatch(links.updateNameAsync({ oldName, newName }))
    const onUpdateUrl = (name, url) => dispatch(links.updateUrlAsync({ name, url }))
    const onPage = (page) => dispatch(links.slice.actions.changePage({ page }))
    const onRemoveLink = (name) => dispatch(links.removeLinkAsync({ name }))
    const pages = useSelector(links.selectPages)

    return <Component
        links={linksView}
        loaded={urlsLoaded && !urlsLoading}
        currentPage={currentPage}
        pageCount={pageCount}
        onClickName={onClickName}
        onClickUrl={onClickUrl}
        editData={editData}
        pages={pages}
        onPage={onPage}
        onEditChanged={onEditChanged}
        onEditCanceled={onEditCanceled}
        onUpdateName={onUpdateName}
        onUpdateUrl={onUpdateUrl}
        onRemoveLink={onRemoveLink}
        {...params}
    />
}

export default Container