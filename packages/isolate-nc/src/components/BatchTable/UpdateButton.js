import React from 'react'
import { Button } from '@dhis2/ui-core'
import { func, arrayOf, string } from 'prop-types'

export const UpdateButton = ({ onClick, data }) => (
    <div title={!data[4] ? 'Enter a received date' : 'Update batch'}>
        <Button
            small
            disabled={!data[4]}
            onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                onClick({
                    batchId: data[0],
                    events: JSON.parse(data[5]),
                    received: data[4],
                    dispatched: data[6],
                    dispatchStatus: data[7],
                })
            }}
        >
            Update
        </Button>
    </div>
)

UpdateButton.propTypes = {
    onClick: func.isRequired,
    data: arrayOf(string).isRequired,
}
