const mock_data = {
    links: [{
        name: 'Google',
        url: 'https://google.com',
        hits: 12,
    }, {
        name: 'Facebook',
        url: 'https://facebook.com',
        hits: 0,
    }, {
        name: 'Twitter',
        url: 'https://twitter.com',
        hits: 0,
    }, {
        name: 'Instagram',
        url: 'https://instagram.com',
        hits: 0,
    }, {
        name: 'LinkedIn',
        url: 'https://linkedin.com',
        hits: 0,
    }, {
        name: 'YouTube',
        url: 'https://youtube.com',
        hits: 0,
    }, {
        name: 'Twitch',
        url: 'https://twitch.tv',
        hits: 0,
    }, {
        name: 'Reddit',
        url: 'https://reddit.com',
        hits: 0,
    }, {
        name: 'Pinterest',
        url: 'https://pinterest.com',
        hits: 0,
    }, {
        name: 'GitHub',
        url: 'https://github.com',
        hits: 0,
    }, {
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com',
        hits: 0,
    }, {
        name: 'Wikipedia',
        url: 'https://wikipedia.org',
        hits: 0,
    }, {
        name: 'Netflix',
        url: 'https://netflix.com',
        hits: 17,
    }, {
        name: 'Amazon',
        url: 'https://amazon.com',
        hits: 0,
    }, {
        name: 'IMDb',
        url: 'https://imdb.com',
        hits: 0,
    }, {
        name: 'eBay',
        url: 'https://ebay.com',
        hits: 0,
    }, {
        name: 'Craigslist',
        url: 'https://craigslist.org',
        hits: 0,
    }, {
        name: 'PayPal',
        url: 'https://paypal.com',
        hits: 3,
    }, {
        name: 'Spotify',
        url: 'https://spotify.com',
        hits: 0,
    }, {
        name: 'Apple',
        url: 'https://apple.com',
        hits: 0,
    }, {
        name: 'Microsoft',
        url: 'https://microsoft.com',
        hits: 0,
    }, {
        name: 'Yahoo',
        url: 'https://yahoo.com',
        hits: 15,
    }, {
        name: 'Bing',
        url: 'https://bing.com',
        hits: 0,
    }, {
        name: 'Baidu',
        url: 'https://baidu.com',
        hits: 0,
    }, {
        name: 'Yandex',
        url: 'https://yandex.com',
        hits: 0,
    }, {
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com',
        hits: 0,
    }, {
        name: 'Quora',
        url: 'https://quora.com',
        hits: 0,
    }, {
        name: 'Medium',
        url: 'https://medium.com',
        hits: 0,
    }, {
        name: 'Vimeo',
        url: 'https://vimeo.com',
        hits: 0,
    }, {
        name: 'Flickr',
        url: 'https://flickr.com',
        hits: 0,
    }, {
        name: 'WhatsApp',
        url: 'https://whatsapp.com',
        hits: 0,
    }, {
        name: 'TikTok',
        url: 'https://tiktok.com',
        hits: 0,
    }, {
        name: 'Tinder',
        url: 'https://tinder.com',
        hits: 0,
    }, {
        name: 'Dropbox',
        url: 'https://dropbox.com',
        hits: 0,
    }, {
        name: 'Adobe',
        url: 'https://adobe.com',
        hits: 0,
    }]
}

export const get_url = async (name) => {
    const link = mock_data.links.find((item) => item.name === name)
    if (link) {
        return link.url
    }
    throw new Error('get_url failed')
}

export const get_all_urls = async () => {
    return mock_data.links
}

export const update_name = async (old_name, new_name) => {
    return true
}
export const update_url = async (name, url) => {
    return true
}

export const add_url = async (name, url) => {
    return true
}

export const delete_url = async (name) => {
    return true
}
