export const getRules = (rules, programId, programStageId) =>
    rules.filter(
        r =>
            (r.programStage ? r.programStage.id === programStageId : false) ||
            (r.program.id === programId &&
                (r.programStage ? r.programStage.id === programStageId : true))
    )
