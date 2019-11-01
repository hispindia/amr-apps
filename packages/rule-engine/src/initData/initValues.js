const getValue = (id, dataValues) => {
    const dataValue = dataValues.find(dv => dv.dataElement === id)
    return dataValue ? dataValue.value : ''
}

export const initValues = (dataValues, dataElements) =>
    Object.assign(
        {},
        ...Object.keys(dataElements).map(id => ({
            [id]: getValue(id, dataValues),
        }))
    )
