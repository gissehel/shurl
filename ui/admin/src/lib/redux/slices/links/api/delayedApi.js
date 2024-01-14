import * as realApi from './realApi'
import { delay } from './tools'

const delayTimeout = 1000

export const get_url = async (name) => {
    await delay(delayTimeout)
    return await realApi.get_url(name)
}

export const get_all_urls = async () => {
    await delay(delayTimeout)
    return await realApi.get_all_urls()
}

export const update_name = async (old_name, new_name) => {
    await delay(delayTimeout)
    return await realApi.update_name(old_name, new_name)
}

export const update_url = async (name, url) => {
    await delay(delayTimeout)
    return await realApi.update_url(name, url)
}

export const add_url = async (name, url) => {
    await delay(delayTimeout)
    return await realApi.add_url(name, url)
}

export const delete_url = async (name) => {
    await delay(delayTimeout)
    return await realApi.delete_url(name)
}
