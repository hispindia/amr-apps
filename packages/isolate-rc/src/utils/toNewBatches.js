import { CREATE } from '../constants/statuses'

export const toNewBatches = batches =>
    batches
        .filter(b => b.status === CREATE)
        .map(b => [
            b.BatchNo,
            b.rows.selectedArray.map(event => event.amrid).join(),
            b.program.displayName,
            b.createdDate,
        ])
