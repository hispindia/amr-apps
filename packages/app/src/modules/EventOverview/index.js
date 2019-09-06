import React from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LoadingSection, TitleRow } from 'components'
import { Table } from './Table'
import { useEvents } from './useEvents'
import { titles, headers } from './config'

/**
 * Shows events by status.
 */
export const EventOverview = ({ match, history }) => {
    const status = match.params.status
    const selected = useSelector(state => state.selectedOrgUnit.id)
    const { rows, loading, addButtonDisabled, error } = useEvents(status)

    /**
     * Called when table row is clicked.
     */
    const onEventClick = row =>
        history.push(`/orgUnit/${row[5]}/event/${row[6]}`)

    /**
     * On table add click.
     */
    const onAddClick = () => history.push(`/orgUnit/${selected}/event/`)

    return (
        <>
            <TitleRow title={titles[status]} />
            {!error &&
                (loading ? (
                    <LoadingSection />
                ) : (
                    <Table
                        rows={rows}
                        headers={headers}
                        onEventClick={onEventClick}
                        onAddClick={onAddClick}
                        addButtonDisabled={addButtonDisabled}
                    />
                ))}
        </>
    )
}

export default withRouter(EventOverview)