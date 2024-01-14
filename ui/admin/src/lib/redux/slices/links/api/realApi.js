const get_data = async (url) => {
    const result = await fetch(url)
    if (result.ok) {
        const data = await result.json()
        return data
    }
    return null
}

const change_data = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    if (result.ok) {
        const data = await result.json()
        return data
    }
    return null
}

export const get_url = async (name) => {
    const data = await get_data(`/_/admin-get-url/${name}`)
    if (data && data.url) {
        return data.url
    }
    throw new Error('get_url failed')
}
export const get_all_urls = async () => {
    const data = await get_data(`/_/get-all-urls`)
    if (data && data.urls) {
        return data.urls
    }
    throw new Error('get_all_urls failed')
}

export const update_name = async (old_name, new_name) => {
    const data = await change_data(`/_/update-name`, {
        old_name,
        new_name,
    })
    if (data && data.ok) {
        return true
    }
    throw new Error('update_name failed')
}
export const update_url = async (name, url) => {
    const data = await change_data(`/_/update-url`, {
        name,
        url,
    })
    if (data && data.ok) {
        return true
    }
    throw new Error('update_url failed')
}
export const add_url = async (name, url) => {
    const data = await change_data(`/_/add-url`, {
        name,
        url,
    })
    if (data && data.ok) {
        return true
    }
    throw new Error('add_url failed')
}

export const delete_url = async (name) => {
    const data = await change_data(`/_/delete-url`, {
        name,
    })
    if (data && data.ok) {
        return true
    }
    throw new Error('delete_url failed')
}
