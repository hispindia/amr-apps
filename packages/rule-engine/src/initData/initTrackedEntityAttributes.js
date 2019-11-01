export const initTrackedEntityAttributes = trackedEntityAttributes =>
    Object.assign(
        {},
        ...trackedEntityAttributes.map(attribute => ({
            [attribute.id]: attribute,
        }))
    )
