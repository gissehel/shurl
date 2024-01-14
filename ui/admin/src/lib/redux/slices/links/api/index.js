import * as subApi from './realApi'

export const get_url = async (name) => {
    return await subApi.get_url(name)
}

export const get_all_urls = async () => {
    return await subApi.get_all_urls()
}

export const update_name = async (old_name, new_name) => {
    return await subApi.update_name(old_name, new_name)
}

export const update_url = async (name, url) => {
    return await subApi.update_url(name, url)
}

export const add_url = async (name, url) => {
    return await subApi.add_url(name, url)
}

export const delete_url = async (name) => {
    return await subApi.delete_url(name)
}