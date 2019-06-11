import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    PersonForm,
    ProgressSection,
    RecordForm,
    RecordPanel,
    TitleRow,
} from 'modules'
import { isDuplicateRecord } from 'api'
import { Margin } from 'styles'
import { invalidReason, types } from './constants'
import { getExistingEvent, initNewEvent, createNewEvent } from '../../actions'
import { EventButtons } from './EventButtons'
import { EventModal } from './EventModal'

export const RecordSections = ({ history, match }) => {
    const dispatch = useDispatch()
    const constants = useSelector(state => state.metadata.constants)
    const entityValid = useSelector(state => state.data.entity.valid)
    const panelValid = useSelector(state => state.data.panel.valid)
    const eventId = useSelector(state => state.data.event.id)
    const deletePrompt = useSelector(state => state.data.deletePrompt)
    const orgUnit = match.params.orgUnit
    const event = match.params.event

    //const [state, dispatchlol] = hook(props.match.params.orgUnit)

    /*const {
        entityId,
        entityValid,
        organism,
        panelValid,
        eventId,
        status,
        eventInvalid,
        buttonDisabled,
        loading,
        deleteClicked,
        duplicate,
    } = state*/

    /*const disabled =
        buttonDisabled ||
        eventInvalid !== false ||
        !entityValid ||
        !panelValid ||
        duplicate === 'ERROR'*/

    useEffect(() => {
        if (event) dispatch(getExistingEvent(orgUnit, event))
        else dispatch(initNewEvent(orgUnit))
        //else dispatchlol({ type: types.SET_CODE, code: getCode(orgUnits) })
    }, [])

    useEffect(() => {
        if (panelValid && !event) dispatch(createNewEvent())
    }, [panelValid])

    /*useEffect(() => {
        const getNewRecord = async () => {
            dispatchlol({ type: types.DISABLE_BUTTON, buttonDisabled: true })
            dispatchlol({ type: types.SET_LOADING })
            dispatchlol({
                type: types.NEW_RECORD,
                ...(await newRecord(
                    programId,
                    programs
                        .find(p => p.id === programId)
                        .programStages.find(s => s.id === programStageId),
                    organism,
                    orgUnit,
                    entityId,
                    entityValues,
                    sampleDate,
                    code
                )),
            })
        }
        if (panelValid && !event) getNewRecord()
    }, [panelValid])*/

    /*useEffect(() => {
        const deleteAndExit = async () => {
            await deleteEvent(eventId)
            props.history.goBack()
        }
        if (deleteConfirmation) deleteAndExit()
        else dispatchlol({ type: types.DISABLE_BUTTON, buttonDisabled: false })
    }, [deleteConfirmation])*/

    /*const checkDuplicate = async sampleId => {
        if (!constants.days) return
        dispatchlol({
            type: types.SET_DUPLICATE,
            duplicate: await isDuplicateRecord(
                eventId,
                entityId,
                organism,
                sampleId
            ),
        })
    }*/

    /*const onRecordValues = useCallback(
        valid => dispatchlol({ type: types.EVENT_VALID, invalid: valid }),
        []
    )*/

    return (
        <>
            {deletePrompt && <EventModal history={history} />}
            <TitleRow title="Record" history={history} />
            <PersonForm
                showEdit={!event && !panelValid}
                initLoading={event && !eventId}
            />
            {entityValid && <RecordPanel />}
            {eventId && <RecordForm />}
            {/*loading && <ProgressSection />*/}
            <EventButtons history={history} eventParam={event} />
        </>
    )
}
