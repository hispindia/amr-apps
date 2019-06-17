import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents } from 'api'
import { LoadingSection, TitleRow } from 'components'
import { Table } from './Table'
import { hook } from './hook'
import { titles, headers } from './config'
import { showAlert } from '../../actions/alert'

/**
 * Shows events by status.
 */
export const EventOverview = ({ match, history }) => {
    const dispatch = useDispatch()
    const { categories, isApproval } = useSelector(state => state.appConfig)
    const { programList, user } = useSelector(state => state.metadata)
    const selected = useSelector(state => state.selectedOrgUnit.id)
    const [
        { rows, loading, addButtonDisabled, error },
        dispatcher,
        types,
    ] = hook()

    useEffect(() => {
        if (isApproval) return
        const noProgram = !programList.find(p => p.orgUnits.includes(selected))
        if (noProgram !== addButtonDisabled)
            dispatcher({ type: types.NEW_PROGRAMS, disable: noProgram })
    }, [selected])

    useEffect(() => {
        dispatcher({ type: types.LOADING })
        init()
    }, [selected, match.params.status])

    const init = async () => {
        try {
            const events = await getEvents(
                categories.find(c => c.status === match.params.status),
                selected,
                {
                    username: !isApproval ? user.username : false,
                    l2Member: user.l2Member,
                }
            )
            dispatcher({
                type: types.NEW_ROWS,
                rows: events,
            })
        } catch (error) {
            console.error(error)
            dispatcher({ type: types.EVENTS_ERRORED })
            dispatch(showAlert('Failed to get records', { critical: true }))
        }
    }

    /**
     * Called when table row is clicked.
     */
    const onEventClick = row =>
        history.push('/orgUnit/' + row[5] + '/event/' + row[6])

    /**
     * On table add click.
     */
    const onAddClick = () => history.push('/orgUnit/' + selected + '/event/')

    return (
        <>
            <TitleRow title={titles[match.params.status]} />
            {!error &&
                (loading ? (
                    <LoadingSection />
                ) : (
                    <Table
                        rows={rows}
                        headers={headers}
                        onEventClick={onEventClick}
                        onAddClick={onAddClick}
                        addButton={!isApproval}
                        addButtonDisabled={addButtonDisabled}
                    />
                ))}
        </>
    )
}

export default withRouter(EventOverview)
