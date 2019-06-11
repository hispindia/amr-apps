import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    ModalPopup,
    PersonForm,
    ProgressSection,
    RecordForm,
    RecordPanel,
    TitleRow,
} from 'modules'
import { isDuplicateRecord } from 'api'
import { ButtonRow } from 'inputs'
import { RecordContextProvider } from 'contexts'
import { Margin } from 'styles'
import { invalidReason, types } from './constants'
import { hook } from './hook'
import {
    getExistingEvent,
    submitEvent,
    editEvent,
    setDeletePrompt,
    resetEntity,
    initNewEvent,
    createNewEvent,
} from '../../actions'

export const RecordSections = props => {
    const dispatch = useDispatch()
    const constants = useSelector(state => state.metadata.constants)
    const entityValid = useSelector(state => state.data.entity.valid)
    const panelValid = useSelector(state => state.data.panel.valid)
    const eventId = useSelector(state => state.data.event.id)
    const orgUnit = props.match.params.orgUnit
    const event = props.match.params.event

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
        if (event) dispatch(getExistingEvent(event))
        else dispatch(initNewEvent(orgUnit))
        //else dispatchlol({ type: types.SET_CODE, code: getCode(orgUnits) })
    }, [])

    useEffect(() => {
        if (panelValid) dispatch(createNewEvent())
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

    const onSubmit = async addMore => {
        await dispatch(submitEvent())
        if (!addMore) props.history.goBack()
    }

    const onEdit = () => dispatch(editEvent())

    const onDelete = () => dispatch(setDeletePrompt(true))

    const onDeleteConfirmation = async confirmed => {
        await dispatch(deleteEvent(confirmed))
        if (confirmed) props.history.goBack()
    }

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
        <Margin>
            {/*deleteClicked && (
                <ModalPopup
                    heading="Delete record"
                    text="Are you sure you want to permanently delete this record?"
                    onClick={onDeleteConfirmation}
                    label="Delete"
                    icon="delete"
                    destructive
                    deletion
                />
            )*/}
            <TitleRow title="Record" history={props.history} />
            <PersonForm
                showEdit={!event && !panelValid}
                initLoading={event && !eventId}
            />
            {entityValid && <RecordPanel />}
            {eventId && <RecordForm />}
            {/*loading && <ProgressSection />*/}
            {/*<ButtonRow
                buttons={
                    event
                        ? !eventId
                            ? []
                            : [
                                  {
                                      label: 'Delete',
                                      onClick: onDelete,
                                      disabled:
                                          !status.deletable || buttonDisabled,
                                      icon: 'delete',
                                      destructive: true,
                                      tooltip: 'Permanently delete record',
                                      disabledTooltip:
                                          'You cannot delete records with an approval status',
                                  },
                                  {
                                      label: status.completed
                                          ? 'Edit'
                                          : 'Submit',
                                      onClick: () =>
                                          status.completed
                                              ? onEdit()
                                              : onSubmit(false),
                                      disabled: status.completed
                                          ? !status.editable
                                          : disabled,
                                      icon: status.completed ? 'edit' : 'done',
                                      primary: true,
                                      tooltip: status.completed
                                          ? 'Edit record'
                                          : 'Submit record',
                                      disabledTooltip: status.completed
                                          ? 'Records with this approval status cannot be edited'
                                          : duplicate === 'ERROR'
                                          ? invalidReason.error
                                          : eventInvalid
                                          ? eventInvalid
                                          : undefined,
                                  },
                              ]
                        : [
                              {
                                  label: 'Submit and add new',
                                  onClick: () => onSubmit(true),
                                  disabled: disabled,
                                  icon: 'add',
                                  primary: true,
                                  tooltip:
                                      'Submit record and add new record for the same person',
                                  disabledTooltip:
                                      duplicate === 'ERROR'
                                          ? invalidReason.error
                                          : eventInvalid
                                          ? eventInvalid
                                          : undefined,
                              },
                              {
                                  label: 'Submit',
                                  onClick: () => onSubmit(false),
                                  disabled: disabled,
                                  icon: 'done',
                                  primary: true,
                                  tooltip: 'Submit record',
                                  disabledTooltip:
                                      duplicate === 'ERROR'
                                          ? invalidReason.error
                                          : eventInvalid
                                          ? eventInvalid
                                          : undefined,
                              },
                          ]
                }
            />*/}
        </Margin>
    )
}
