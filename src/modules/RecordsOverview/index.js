import React, { useContext, useEffect } from 'react'
import { string } from 'prop-types'
import { Card } from '@dhis2/ui/core'
import { getEvents } from 'api'
import { Margin } from 'styles'
import { RecordTable, ProgressSection, TitleRow } from 'modules'
import { ConfigContext, MetadataContext } from 'contexts'
import { hook } from './hook'
import { titles, headers } from './config'

/**
 * Shows events by status.
 */
export const RecordsOverview = ({ selected, match, history }) => {
    const { categories, isApproval } = useContext(ConfigContext)
    const { programList, user } = useContext(MetadataContext)
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
        <Margin>
            <TitleRow title={titles[match.params.status]} />
            {loading ? (
                <ProgressSection />
            ) : (
                <Card>
                    <RecordTable
                        rows={rows}
                        headers={headers}
                        onEventClick={onEventClick}
                        onAddClick={onAddClick}
                        addButton={!isApproval}
                        addButtonDisabled={addButtonDisabled}
                    />
                </Card>
            )}
        </Margin>
    )
}

RecordsOverview.propTypes = { selected: string.isRequired }
