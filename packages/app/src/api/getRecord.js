import { getProgramStage } from './helpers'
import { getEventValues } from './getEventValues'

export const getRecord = async (programs, eventId, isIsolate) => {
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
            isIsolate,
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
