let baseUrl = ''

/**
 * Gets base URL.
 * @returns {string} Base URL.
 */
export function getBaseUrl() {
    return { ...baseUrl }
}

/**
 * Sets the base URL.
 * @param {String} url
 */
export function setBaseUrl(url) {
    baseUrl = url + '/'
}

/**
 * @param {String} endpoint
 * @returns Server response.
 */
export async function get(endpoint) {
    const response = await fetch(baseUrl + endpoint, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        },
    })
    return await response.json()
}

/**
 * Puts data.
 * @param {String} endpoint
 * @param {Object} data
 * @returns Server response.
 */
export async function put(endpoint, data) {
    const response = await fetch(baseUrl + endpoint, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    })
    return await response.json()
}

/**
 * Patches data. Does not work with attributeValues.
 * @param {String} endpoint
 * @param {Object} data
 * @returns Server response.
 */
export async function patch(endpoint, data) {
    const response = await fetch(baseUrl + endpoint, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    })
    return await response
}

/**
 * Posts data in endpoint.
 * @param {String} endpoint
 * @returns Server response.
 */
export async function post(endpoint) {
    const response = await fetch(baseUrl + endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        },
    })
    return await response
}

/**
 * Posts data.
 * @param {String} endpoint
 * @param {Object} data
 * @returns Server response.
 */
export async function postData(endpoint, data) {
    const response = await fetch(baseUrl + endpoint, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    })
    return await response
}

/**
 * Deletes object by endpoint.
 * @param {String} endpoint
 * @returns Server response.
 */
export async function del(endpoint) {
    const response = await fetch(baseUrl + endpoint, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        },
    })
    return await response
}
