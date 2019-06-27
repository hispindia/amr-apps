import { createAction } from '../createAction'
import { SET_PANEL, SET_PANEL_VALUE, RESET_PANEL } from '../types'

export const setProgram = program => (dispatch, getState) => {
    const { programOrganisms, optionSets, stageLists } = getState().metadata
    const organisms = []
    optionSets[programOrganisms[program]].forEach(o => {
        if (!organisms.find(org => org.value === o.value)) organisms.push(o)
    })
    const programStage =
        stageLists[program].length > 1 ? '' : stageLists[program][0].value

    dispatch(
        createAction(SET_PANEL, {
            program,
            programStage,
            organism: '',
            sampleDate: '',
            organisms,
            valid: false,
        })
    )
}

export const setPanelValue = (key, value) => (dispatch, getState) => {
    const {
        program,
        programStage,
        organism,
        sampleDate,
    } = getState().data.panel
    const values = { program, programStage, organism, sampleDate }

    if (values[key] === value) return
    const valid = !Object.values({ ...values, [key]: value }).includes('')

    dispatch(
        createAction(SET_PANEL_VALUE, {
            key,
            value,
            valid,
        })
    )
}

export const resetPanel = () => dispatch => dispatch(createAction(RESET_PANEL))
