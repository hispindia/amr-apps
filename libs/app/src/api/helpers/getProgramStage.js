import { ORGANISM_ELEMENT, AMR_ELEMENT } from 'constants/dhis2'

export const getProgramStage = async (
    pStage,
    values,
    { completed, isIsolate }
) => {
    const shouldDisable = id => {
        switch (id) {
            case AMR_ELEMENT:
                return values[AMR_ELEMENT] && values[AMR_ELEMENT] !== ''
            case ORGANISM_ELEMENT:
                return (
                    values[ORGANISM_ELEMENT] && values[ORGANISM_ELEMENT] !== ''
                )
            default:
                return isIsolate && !programStage.dataElements[id].editable
        }
    }

    const setEditable = dataElements =>
        dataElements.forEach(
            id => (programStage.dataElements[id].editable = true)
        )

    const programStage = JSON.parse(JSON.stringify(pStage))

    programStage.programStageSections.forEach(s => {
        if (s.editable) setEditable(s.dataElements)
        s.childSections.forEach(cs => {
            if (cs.editable) setEditable(cs.dataElements)
        })
    })

    Object.keys(programStage.dataElements).forEach(id => {
        const dataElement = programStage.dataElements[id]
        dataElement.disabled = shouldDisable(id)
        if (dataElement.optionSet)
            dataElement.optionSet = dataElement.optionSet.id
        if (!values[id]) values[id] = ''
    })

    const status = {
        deletable: !completed,
        editable: true,
        finished: false,
        completed: completed,
    }

    return { programStage, status, eventValues: values }
}
