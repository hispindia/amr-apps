const getProgramStageDataElements = (dataElements, programStageDataElements) =>
    programStageDataElements.map(({ dataElement, compulsory }) => ({
        [dataElement.id]: {
            ...dataElements[dataElement.id],
            hide: false,
            required: compulsory,
        },
    }))

/**
 * Returns programs with data element props in a single object.
 * @param {Object[]} programs
 * @param {Object} dataElements
 * @returns {Object[]}
 */
export const setPrograms = (programs, dataElements) =>
    programs.map(p => ({
        ...p,
        programStages: p.programStages
            .filter(ps => ps.access.data.write)
            .map(ps => ({
                ...ps,
                programStageSections: ps.programStageSections.map(pss => ({
                    ...pss,
                    dataElements: pss.dataElements.map(d => d.id),
                })),
                dataElements: Object.assign(
                    {},
                    ...getProgramStageDataElements(
                        dataElements,
                        ps.programStageDataElements
                    )
                ),
            })),
    }))
