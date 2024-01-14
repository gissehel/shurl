const mock_data = {
    links: [{
        name: 'Google',
        url: 'https://google.com',
    }, {
        name: 'Facebook',
        url: 'https://facebook.com',
    }, {
        name: 'Twitter',
        url: 'https://twitter.com',
    }, {
        name: 'Instagram',
        url: 'https://instagram.com',
    }, {
        name: 'LinkedIn',
        url: 'https://linkedin.com',
    }, {
        name: 'YouTube',
        url: 'https://youtube.com',
    }, {
        name: 'Twitch',
        url: 'https://twitch.tv',
    }, {
        name: 'Reddit',
        url: 'https://reddit.com',
    }, {
        name: 'Pinterest',
        url: 'https://pinterest.com',
    }, {
        name: 'GitHub',
        url: 'https://github.com',
    }, {
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com',
    }, {
        name: 'Wikipedia',
        url: 'https://wikipedia.org',
    }, {
        name: 'Netflix',
        url: 'https://netflix.com',
    }, {
        name: 'Amazon',
        url: 'https://amazon.com',
    }, {
        name: 'IMDb',
        url: 'https://imdb.com',
    }, {
        name: 'eBay',
        url: 'https://ebay.com',
    }, {
        name: 'Craigslist',
        url: 'https://craigslist.org',
    }, {
        name: 'PayPal',
        url: 'https://paypal.com',
    }, {
        name: 'Spotify',
        url: 'https://spotify.com',
    }, {
        name: 'Apple',
        url: 'https://apple.com',
    }, {
        name: 'Microsoft',
        url: 'https://microsoft.com',
    }, {
        name: 'Yahoo',
        url: 'https://yahoo.com',
    }, {
        name: 'Bing',
        url: 'https://bing.com',
    }, {
        name: 'Baidu',
        url: 'https://baidu.com',
    }, {
        name: 'Yandex',
        url: 'https://yandex.com',
    }, {
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com',
    }, {
        name: 'Quora',
        url: 'https://quora.com',
    }, {
        name: 'Medium',
        url: 'https://medium.com',
    }, {
        name: 'Vimeo',
        url: 'https://vimeo.com',
    }, {
        name: 'Flickr',
        url: 'https://flickr.com',
    }, {
        name: 'WhatsApp',
        url: 'https://whatsapp.com',
    }, {
        name: 'TikTok',
        url: 'https://tiktok.com',
    }, {
        name: 'Tinder',
        url: 'https://tinder.com',
    }, {
        name: 'Dropbox',
        url: 'https://dropbox.com',
    }, {
        name: 'Adobe',
        url: 'https://adobe.com',
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
