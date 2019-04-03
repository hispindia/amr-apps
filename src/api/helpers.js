import { get } from './crud'

const _organismsDataElementId = 'SaQe2REkGVw'
const _amrDataElement = 'lIkk661BLpG'
const _l1ApprovalStatus = 'tAyVrNUTVHX'
const _l1RejectionReason = 'NLmLwjdSHMv'
const _l1RevisionReason = 'wCNQtIHJRON'
const _l2ApprovalStatus = 'sXDQT6Yaf77'
const _l2RejectionReason = 'pz8SoHBO6RL'
const _l2RevisionReason = 'fEnFVvEFKVc'

/**
 * Gets values for a single event.
 * @param {string} eventId - AMR Id.
 * @returns {Object} Event values.
 */
export const getEventValues = async eventId => {
    const event = await get('events/' + eventId)
    let values = {}

    if (event.dataValues)
        event.dataValues.forEach(
            dataValue => (values[dataValue.dataElement] = dataValue.value)
        )

    return {
        programId: event.program,
        programStageId: event.programStage,
        eventValues: values,
        completed: event.status === 'COMPLETED',
        entityId: event.trackedEntityInstance
    }
}

/**
 * Generates AMR Id consisting of OU code and a random integer.
 * @param {string} orgUnitId - Organisation unit ID.
 * @returns {string} AMR Id.
 */
export const generateAmrId = async orgUnitId => {
    const orgUnitCode = (await get(
        'organisationUnits/' + orgUnitId + '.json?fields=code'
    )).code

    const newCode = () =>
        orgUnitCode + (Math.floor(Math.random() * 90000) + 10000)

    let amrId = newCode()
    while (
        (await get(
            'events.json?paging=false&fields=event&orgUnit=' +
                orgUnitId +
                '&filter=' +
                _amrDataElement +
                ':eq:' +
                amrId
        )).events.length !== 0
    )
        amrId = newCode()

    return amrId
}

export const getProgramStage = async (
    programStage,
    values,
    completed,
    newRecord,
    isL1User,
    isL2User
) => {
    const shouldDisable = element => {
        switch (element.id) {
            case _amrDataElement:
                return values[_amrDataElement]
                    && values[_amrDataElement] !== ''
            case _organismsDataElementId:
                return values[_organismsDataElementId]
                    && values[_organismsDataElementId] !== ''
            case _l1ApprovalStatus:
            case _l1RejectionReason:
            case _l1RevisionReason:
                return (
                    !isL1User ||
                    values[_l1ApprovalStatus] === 'Approved' ||
                    values[_l1ApprovalStatus] === 'Rejected' ||
                    values[_l2ApprovalStatus] === 'Rejected'
                )
            case _l2ApprovalStatus:
            case _l2RejectionReason:
            case _l2RevisionReason:
                return (
                    !isL2User ||
                    values[_l2ApprovalStatus] === 'Approved' ||
                    values[_l2ApprovalStatus] === 'Rejected' ||
                    values[_l1ApprovalStatus] === 'Rejected'
                )
            default:
                if (newRecord) return false
                else if (isL1User || isL2User) return true
                else
                    return !(
                        (values[_l2ApprovalStatus] === 'Resend' &&
                            values[_l1ApprovalStatus] !== 'Rejected') ||
                        (values[_l1ApprovalStatus] === 'Resend' ||
                            values[_l1ApprovalStatus] === '' ||
                            !values[_l1ApprovalStatus])
                    )
        }
    }

    const setDataElements = (dataElements, psDataElements) =>
        dataElements.forEach(de => {
            de.hide = false
            // Adding missing values.
            if (!values[de.id]) values[de.id] = ''
            // Adding required property.
            de.required = psDataElements.find(psde =>
                psde.dataElement.id === de.id
            ).compulsory
            de.disabled = shouldDisable(de)

        })

    programStage.programStageSections.forEach(s => {
        s.hideWithValues = (s.name === 'Results'
            || (s.name === 'Approval'
                && !isL1User
                && !isL2User
                && !values[_l1ApprovalStatus]
                && !values[_l2ApprovalStatus]
            )
        )

        setDataElements(s.dataElements, programStage.programStageDataElements)
        s.childSections.forEach(cs => {
            cs.hide = false
            setDataElements(cs.dataElements, programStage.programStageDataElements)
        })
    })

    const status = {
        deletable: values === {}
            || (!values[_l1ApprovalStatus]
            && !values[_l2ApprovalStatus]),
        editable: values === {}
            || (!values[_l1ApprovalStatus] && !values[_l2ApprovalStatus])
            || [values[_l1ApprovalStatus], values[_l2ApprovalStatus]].includes('Resend'),
        finished: values[_l1ApprovalStatus] === values[_l2ApprovalStatus] === 'Approved',
        completed: completed
    }

    return { programStage, status, eventValues: values }
}
