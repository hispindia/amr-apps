if (!process.env.REACT_APP_DHIS2_BASE_URL)
    throw new Error(
        'The environment variable REACT_APP_DHIS2_BASE_URL must be set'
    )

const baseUrl = `${process.env.REACT_APP_DHIS2_BASE_URL}/api/`

/**
 * @param {String} endpoint
 * @returns Server response.
 */
export const get = async endpoint =>
    await (await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        },
    })).json()

/**
 * Puts data.
 * @param {String} endpoint
 * @param {Object} data
 * @returns Server response.
 */
export const put = async (endpoint, data) =>
    await (await fetch(baseUrl + endpoint, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    })).json()

/**
 * Posts data.
 * @param {String} endpoint
 * @param {Object} data
 * @returns Server response.
 */
export const post = async (endpoint, data) =>
    await (await fetch(baseUrl + endpoint, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    })).json()

/**
 * Deletes object by endpoint.
 * @param {String} endpoint
 * @returns Server response.
 */
export const del = async endpoint =>
    await (await fetch(baseUrl + endpoint, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        },
    })).json()
