import React from 'react'
import { useSelector } from 'react-redux'
import {
    MainSection,
    LoadingSection,
    TitleRow,
    RichButton,
} from '@hisp-amr/app'
import { Table } from './Table'
import { useEvents } from './useEvents'
import { titles, headers } from './config'

const title = {
    true: 'You cannot add records for the selected location',
    false: 'Add new record',
}

/**
 * Shows events by status.
 */
export const EventOverview = ({ match, history }) => {
    const status = match.params.status
    const selected = useSelector(state => state.selectedOrgUnit)
    const { rows, loading, addButtonDisabled, error } = useEvents(status)

    /**
     * Called when table row is clicked.
     */
    const onEventClick = row =>
        history.push(`/orgUnit/${row[5]}/event/${row[6]}`)

    /**
     * On table add click.
     */
    const onAddClick = () => history.push(`/orgUnit/${selected.id}/event/`)

    return (
        <MainSection>
            <TitleRow
                title={titles[status]}
                button={
                    <div title={title[addButtonDisabled]}>
                        <RichButton
                            primary
                            large
                            icon="add"
                            label="Add record"
                            disabled={addButtonDisabled}
                            onClick={onAddClick}
                        />
                    </div>
                }
            />
            {!error &&
                (loading ? (
                    <LoadingSection />
                ) : (
                    <Table
                        rows={rows}
                        headers={headers}
                        onEventClick={onEventClick}
                        title={selected.displayName}
                    />
                ))}
        </MainSection>
    )
}
