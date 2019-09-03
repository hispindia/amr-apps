import { getProgramStage, getEventValues } from './internal'

export const getRecord = async (programs, eventId) => {
    const {
        eventValues: initialValues,
        programId: program,
        programStageId,
        completed,
        entityId,
        sampleDate,
    } = await getEventValues(eventId)
    const pStage = programs
        .find(p => p.id === program)
        .programStages.find(ps => (ps.id = programStageId))
    const { programStage, eventValues, status } = await getProgramStage(
        pStage,
        initialValues,
        {
            completed,
            newRecord: false,
        }
    )

    return {
        program,
        programStage,
        eventValues,
        status,
        eventId,
        entityId,
        sampleDate,
    }
}
