import React, { useState, useEffect } from 'react'
import { getEvents, Margin } from '../..'
import { RecordTable, ProgressSection, TitleRow } from '..'
import { titles, headers } from './config'

/**
 * Shows events by status.
 */
export const RecordsOverview = props => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [addButtonDisabled, setAddButtonDisabled] = useState(true)

    useEffect(() => {
        if(props.isApproval) return
        const noProgram = !props.programs.find(p =>
            p.organisationUnits.find(ou => ou.id === props.selected))
        if (noProgram !== addButtonDisabled)
            setAddButtonDisabled(!addButtonDisabled)
    }, [props.selected])

    useEffect(() => {
        setLoading(true)
        init()
    }, [props.selected, props.match.params.status])

    const init = async () => {
        setData({
            rows: await getEvents(
                props.tables[props.match.params.status],
                props.selected,
                !props.isApproval
            ),
            headers: headers,
        })
        setLoading(false)
    }

    /**
     * Called when table row is clicked.
     */
    const onEventClick = row =>
        props.history.push('/orgUnit/' + row[5] + '/event/' + row[6])

    /**
     * On table add click.
     */
    const onAddClick = () =>
        props.history.push('/orgUnit/' + props.selected + '/event/')

    return (
        <Margin>
            <TitleRow title={titles[props.match.params.status]} />
            {loading ? <ProgressSection /> :
                <RecordTable
                    data={data}
                    onEventClick={onEventClick}
                    title=""
                    onAddClick={onAddClick}
                    addButton={!props.isApproval}
                    addButtonDisabled={addButtonDisabled}
                />
            }
        </Margin>
    )
}
