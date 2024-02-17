'use client'

import { Button, Input, TableRow, TableCell } from 'semantic-ui-react'

import style from './NewLink.module.css'

const Component = ({ name, url, asTableRow, onNameChanged, onUrlChanged, onValidate }) => {
    name = name || ''
    url = url || ''
    onNameChanged = onNameChanged || (() => { })
    onUrlChanged = onUrlChanged || (() => { })
    onValidate = onValidate || (() => { })
    asTableRow = asTableRow || false
    const onSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        onValidate(name, url)
    }
    return (
        asTableRow ?
            <TableRow>
                <TableCell>
                    <form onSubmit={onSubmit}>
                    <Input
                        placeholder='Name...'
                        className={style.NewLinkName}
                        fluid={true}
                        value={name}
                        onChange={(event, item) => onNameChanged(item.value)}
                    />
                    <input type='submit' hidden />
                    </form>
                </TableCell>
                <TableCell>
                    <form onSubmit={onSubmit}>
                    <Input
                        placeholder='Url...'
                        className={style.NewLinkUrl}
                        fluid={true}
                        value={url}
                        onChange={(event, item) => onUrlChanged(item.value)}
                    />
                    <input type='submit' hidden />
                    </form>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                    <Button primary icon='plus' onClick={onSubmit} />
                </TableCell>
            </TableRow> :
            <div className={style.NewLink}>
                <Input placeholder='Name...' className={style.NewLinkName} />
                <Input placeholder='Url...' className={style.NewLinkUrl} />
                <Button primary icon='plus'></Button>
            </div>
    )
}

export default Component