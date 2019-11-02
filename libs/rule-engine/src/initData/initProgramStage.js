const getProgramStageDataElements = (dataElements, programStageDataElements) =>
    programStageDataElements.map(({ dataElement, compulsory }) => ({
        [dataElement.id]: {
            ...dataElements.find(({ id }) => id === dataElement.id),
            hide: false,
            required: compulsory,
        },
    }))

/**
 * Returns the program stage with data element props in a single object.
 * @param {Object} programStage
 * @param {Object} dataElements
 * @returns {Object}
 */
export const initProgramStage = (programStage, dataElements) => ({
    ...programStage,
    programStageSections: programStage.programStageSections.map(pss => ({
        ...pss,
        dataElements: pss.dataElements.map(d => d.id),
    })),
    dataElements: Object.assign(
        {},
        ...getProgramStageDataElements(
            dataElements,
            programStage.programStageDataElements
        )
    ),
})
