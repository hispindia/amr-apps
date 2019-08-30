export const request = (
    endpoint,
    { fields, filters, order, options, paging = false }
) => {
    let path = `${endpoint}?paging=${paging}`

    if (fields) path += `&fields=${fields}`
    if (filters) path += `&filter=${filters}`
    if (order) path += `&order=${order}`
    if (options) path += `&${options.join('&')}`

    return path
}
