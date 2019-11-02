import { DISPATCH } from '../constants/statuses'

export const toDispatchedBatches = batches =>
    batches
        .filter(b => b.status === DISPATCH)
        .map(b => [
            b.BatchNo,
            b.rows.selectedArray.map(event => event.amrid).join(', '),
            b.program.displayName,
            b.dispatchDate,
            b.disptachStatus.received +
                (b.disptachStatus.receivedDate
                    ? ` ${b.disptachStatus.receivedDate}`
                    : ''),
        ])
