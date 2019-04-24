import React, { useContext, useEffect } from 'react'
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
    isDuplicate,
} from 'api'
import { ButtonRow } from 'inputs'
import { ConfigContext, MetadataContext, RecordContextProvider } from 'contexts'
import { Margin } from 'styles'
import { hook } from './hook'

export const RecordSections = props => {
    const {
        optionSets,
        programOrganisms,
        programs,
        orgUnits,
        constants,
    } = useContext(MetadataContext)
    const { isApproval } = useContext(ConfigContext)
    const event = props.match.params.event
    const orgUnit = props.match.params.orgUnit

    const [state, dispatch, types] = hook(orgUnit)

    const {
        entityId,
        entityValues,
        entityValid,
        programId,
        programStage,
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
    } = state

    const disabled =
        buttonDisabled ||
        eventInvalid !== false ||
        !entityValid ||
        !panelValid ||
        duplicate

    useEffect(() => {
        const getExistingRecord = async () => {
            dispatch({
                type: types.EXISTING_RECORD,
                ...(await existingRecord(programs, event, isApproval)),
            })
        }
        if (event) getExistingRecord()
        else dispatch({ type: types.SET_CODE, code: getCode(orgUnits) })
    }, [])

    useEffect(() => {
        const getNewRecord = async () => {
            dispatch({ type: types.DISABLE_BUTTON, buttonDisabled: true })
            dispatch({ type: types.SET_LOADING })
            dispatch({
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
    }, [panelValid])

    useEffect(() => {
        const deleteAndExit = async () => {
            await deleteEvent(eventId)
            props.history.goBack()
        }
        if (deleteConfirmation) deleteAndExit()
    }, [deleteConfirmation])

    const onSubmit = async addMore => {
        dispatch({ type: types.DISABLE_BUTTON, buttonDisabled: true })

        await setEventStatus(eventId, true, isApproval)

        if (addMore) dispatch({ type: types.ADD_MORE })
        else props.history.goBack()
    }

    const onEdit = async () => {
        dispatch({ type: types.DISABLE_BUTTON, buttonDisabled: true })
        await setEventStatus(eventId)
        dispatch({ type: types.EDIT })
    }

    const onDelete = () => dispatch({ type: types.DELETE_CLICKED })

    const onDeleteConfirmed = yes =>
        dispatch({
            type: types.DELETE_CONFIRMED,
            delete: yes,
        })

    const getCode = ous => {
        for (const ou of ous) {
            if (ou.id === orgUnit) return ou.code
            if (ou.children) {
                const code = getCode(ou.children)
                if (code) return code
            }
        }
    }

    const checkDuplicate = async sampleId => {
        if (!constants.days) return
        dispatch({
            type: types.SET_DUPLICATE,
            duplicate: await isDuplicate(
                eventId,
                entityId,
                programStage.id,
                optionSets[programOrganisms[programId]].find(
                    o => o.value === organism
                ).label,
                sampleId,
                sampleDate,
                constants.days
            ),
        })
    }

    const onPersonValues = values =>
        dispatch({ type: types.SET_ENTITY, ...values })

    const onPanelValues = values =>
        dispatch({ type: types.SET_PANEL, ...values })

    const onPanelReset = () => dispatch({ type: types.ADD_MORE })

    const onRecordValues = valid =>
        dispatch({ type: types.EVENT_VALID, invalid: valid })

    return (
        <Margin>
            {deleteClicked && (
                <ModalPopup
                    heading="Delete record"
                    text="Are you sure you want to permanently delete this record?"
                    onClick={onDeleteConfirmed}
                    label="Delete"
                    icon="delete"
                    kind="destructive"
                    deletion
                />
            )}
            <TitleRow title="Record" history={props.history} />
            <RecordContextProvider state={state}>
                <PersonForm
                    showEdit={!event && !panelValid}
                    passValues={onPersonValues}
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
                                      kind: 'destructive',
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
                                      kind: 'primary',
                                      tooltip: status.completed
                                          ? 'Edit record'
                                          : 'Submit record',
                                      disabledTooltip: status.completed
                                          ? 'Records with this approval status cannot be edited'
                                          : duplicate || eventInvalid
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
                                  kind: 'primary',
                                  tooltip:
                                      'Submit record and add new record for the same person',
                                  disabledTooltip:
                                      duplicate || eventInvalid
                                          ? eventInvalid
                                          : undefined,
                              },
                              {
                                  label: 'Submit',
                                  onClick: () => onSubmit(false),
                                  disabled: disabled,
                                  icon: 'done',
                                  kind: 'primary',
                                  tooltip: 'Submit record',
                                  disabledTooltip:
                                      duplicate || eventInvalid
                                          ? eventInvalid
                                          : undefined,
                              },
                          ]
                }
            />
        </Margin>
    )
}
