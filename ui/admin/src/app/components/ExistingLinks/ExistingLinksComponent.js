'use client'

import { Table, TableRow, TableHeader, TableHeaderCell, TableBody, TableCell, TableFooter, Input, Segment } from 'semantic-ui-react'
import { Button, Dimmer, Loader, Pagination } from 'semantic-ui-react'
import NewLink from '@/app/components/NewLink'
import style from './ExistingLinks.module.css'
import { useEffect } from 'react'

const DataCell = ({ link, onClick, currentPage, index, isEditable, value, editData, onEditChanged, onEditValidated }) => {
    return <TableCell onClick={() => isEditable || onClick(currentPage, index)} className={style.ExistingLinksCell}>
        {
            isEditable ?
                <form action={onEditValidated}>
                    <Input value={editData} onChange={(event, item) => onEditChanged(item.value)} fluid={true} />
                    <input type="submit" hidden />
                </form> :
                <p>{value}</p>
        }
    </TableCell>
}

const Component = ({
    links, loaded, currentPage, pageCount, pages, onPage,
    onClickName, onClickUrl, editData,
    onEditChanged, onEditCanceled,
    onUpdateName, onUpdateUrl, onRemoveLink,
}) => {
    links = links || []
    loaded = loaded === undefined ? false : loaded
    currentPage = currentPage || 0
    onClickName = onClickName || (() => { })
    onClickUrl = onClickUrl || (() => { })
    const hasEditData = editData !== null
    editData = hasEditData ? editData : ''
    onEditChanged = onEditChanged || (() => { })
    onEditCanceled = onEditCanceled || (() => { })
    pages = pages || []

    useEffect(() => {
        const eventListener = (event) => {
            if (event.key === 'Escape') {
                if (hasEditData) {
                    event.preventDefault()
                    event.stopPropagation()
                    onEditCanceled()
                }
            }
        }

        document.addEventListener('keyup', eventListener)
        return () => {
            document.removeEventListener('keyup', eventListener)
        }
    })

    return (
        <Segment basic>
            {
                loaded ?
                    null :
                    <Dimmer active>
                        <Loader />
                    </Dimmer>
            }

            <Table className={style.ExistingLinks} id={style.ExistingLinksTable}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell width={4}>Name</TableHeaderCell>
                        <TableHeaderCell width={10}>Url</TableHeaderCell>
                        <TableHeaderCell width={2}>Actions</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        links.map((link, index) => {
                            return <TableRow key={index}>
                                <DataCell link={link} onClick={onClickName} currentPage={currentPage} index={index} isEditable={link.nameEditable} value={link.name} editData={editData} onEditChanged={onEditChanged} onEditValidated={() => onUpdateName(link.name, editData)} />
                                <DataCell link={link} onClick={onClickUrl} currentPage={currentPage} index={index} isEditable={link.urlEditable} value={link.url} editData={editData} onEditChanged={onEditChanged} onEditValidated={() => onUpdateUrl(link.name, editData)} />
                                <TableCell className={style.ExistingLinksCell}>
                                    <a href={link.url} target='_blank'><Button icon='external alternate' color='blue'></Button></a>
                                    <Button color='red' icon='trash' onClick={() => onRemoveLink(link.name)}></Button>
                                </TableCell>
                            </TableRow>
                        })
                    }
                    <NewLink asTableRow />
                </TableBody>
                <TableFooter>
                    <TableRow >
                        <TableHeaderCell colSpan='3'>
                            <Pagination
                                activePage={currentPage + 1}
                                totalPages={pageCount}
                                onPageChange={(event, data) => onPage(data.activePage - 1)}
                                floated='right'
                            />
                        </TableHeaderCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Segment>
    )
}

export default Component