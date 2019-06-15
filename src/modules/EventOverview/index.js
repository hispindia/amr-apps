import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getEvents } from 'api'
import { LoadingSection, TitleRow } from 'components'
import { Table } from './Table'
import { hook } from './hook'
import { titles, headers } from './config'

/**
 * Shows events by status.
 */
export const EventOverview = ({ match, history }) => {
    const { categories, isApproval } = useSelector(state => state.appConfig)
    const { programList, user } = useSelector(state => state.metadata)
    const selected = useSelector(state => state.selectedOrgUnit.id)
    const [{ rows, loading, addButtonDisabled }, dispatch, types] = hook()

    useEffect(() => {
        if (isApproval) return
        const noProgram = !programList.find(p => p.orgUnits.includes(selected))
        if (noProgram !== addButtonDisabled)
            dispatch({ type: types.NEW_PROGRAMS, disable: noProgram })
    }, [selected])

    useEffect(() => {
        dispatch({ type: types.LOADING })
        init()
    }, [selected, match.params.status])

    const init = async () =>
        dispatch({
            type: types.NEW_ROWS,
            rows: await getEvents(
                categories.find(c => c.status === match.params.status),
                selected,
                {
                    username: !isApproval ? user.username : false,
                    l2Member: user.l2Member,
                }
            ),
        })

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
            {loading ? (
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
            )}
        </>
    )
}

export default withRouter(EventOverview)
