'use client'

import { links, useSelector, useDispatch } from '@/lib/redux'
import Component from './NewLinkComponent'

const Container = ({ ...params }) => {
    const dispatch = useDispatch()
    const name = useSelector(links.selectNewName)
    const url = useSelector(links.selectNewUrl)

    const onNameChanged = (value) => dispatch(links.slice.actions.editNewName(value))
    const onUrlChanged = (value) => dispatch(links.slice.actions.editNewUrl(value))
    const onValidate = (name, url) => dispatch(links.addNewLinkAsync({ name, url }))

    return <Component
        {...params}
        name={name}
        url={url}
        onNameChanged={onNameChanged}
        onUrlChanged={onUrlChanged}
        onValidate={onValidate}
    />
}

export default Container