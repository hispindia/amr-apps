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
import {
    deleteEvent,
    setEventStatus,
    newRecord,
    existingRecord,
    isDuplicateRecord,
} from 'api'
import { ButtonRow } from 'inputs'
import { RecordContextProvider } from 'contexts'
import { Margin } from 'styles'
import { invalidReason, types } from './constants'
import { hook } from './hook'
import { getExistingEvent, submitEvent } from '../../actions'

export const RecordSections = props => {
    const dispatch = useDispatch()
    const { programs, orgUnits, constants, user } = useSelector(
        state => state.metadata
    )
    const isApproval = useSelector(state => state.appConfig.isApproval)
    const event = props.match.params.event

    const [state, dispatchlol] = hook(props.match.params.orgUnit)

    const {
        entityId,
        entityValues,
        entityValid,
        programId,
        programStageId,
        organism,
        sampleDate,
        panelValid,
        eventId,
        status,
        eventInvalid,
        buttonDisabled,
        loading,
        deleteClicked,
        deleteConfirmation,
        code,
        duplicate,
        orgUnit,
    } = state

    const disabled =
        buttonDisabled ||
        eventInvalid !== false ||
        !entityValid ||
        !panelValid ||
        duplicate === 'ERROR'

    useEffect(() => {
        if (event) dispatch(getExistingEvent(event))
        //else dispatchlol({ type: types.SET_CODE, code: getCode(orgUnits) })
    }, [])

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

    const onEdit = async () => {
        dispatchlol({ type: types.DISABLE_BUTTON, buttonDisabled: true })
        await setEventStatus(eventId)
        dispatchlol({ type: types.EDIT })
    }

    const onDelete = () => dispatchlol({ type: types.DELETE_CLICKED })

    const onDeleteConfirmed = yes =>
        dispatchlol({
            type: types.DELETE_CONFIRMED,
            delete: yes,
        })

    const checkDuplicate = async sampleId => {
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
    }

    const onPersonValues = useCallback(
        values => dispatchlol({ type: types.SET_ENTITY, ...values }),
        []
    )

    const onPersonValue = useCallback(
        values => dispatchlol({ type: types.SET_ENTITY_VALUE, ...values }),
        []
    )

    const onPanelValues = useCallback(
        values => dispatchlol({ type: types.SET_PANEL, ...values }),
        []
    )

    const onPanelReset = useCallback(
        () => dispatchlol({ type: types.ADD_MORE }),
        []
    )

    const onRecordValues = useCallback(
        valid => dispatchlol({ type: types.EVENT_VALID, invalid: valid }),
        []
    )

    return (
        <Margin>
            {deleteClicked && (
                <ModalPopup
                    heading="Delete record"
                    text="Are you sure you want to permanently delete this record?"
                    onClick={onDeleteConfirmed}
                    label="Delete"
                    icon="delete"
                    destructive
                    deletion
                />
            )}
            <TitleRow title="Record" history={props.history} />
            <RecordContextProvider state={state}>
                <PersonForm
                    showEdit={!event && !panelValid}
                    passValues={onPersonValues}
                    onPersonValue={onPersonValue}
                    initLoading={event && !eventId}
                />
                {entityValid && (
                    <RecordPanel
                        passValues={onPanelValues}
                        onReset={!event && eventId ? onPanelReset : null}
                    />
                )}
                {eventId && (
                    <RecordForm
                        passValues={onRecordValues}
                        checkDuplicate={checkDuplicate}
                    />
                )}
            </RecordContextProvider>
            {loading && <ProgressSection />}
            <ButtonRow
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
            />
        </Margin>
    )
}
