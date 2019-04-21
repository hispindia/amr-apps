import React, { useContext, useEffect, useState } from 'react'
import { string } from 'prop-types'
import { Card } from '@dhis2/ui/core'
import { getEvents } from 'api'
import { Margin } from 'styles'
import { RecordTable, ProgressSection, TitleRow } from 'modules'
import { ConfigContext, MetadataContext } from 'contexts'
import { titles, headers } from './config'

/**
 * Shows events by status.
 */
export const RecordsOverview = props => {
    const { tables, isApproval } = useContext(ConfigContext)
    const { programList } = useContext(MetadataContext)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [addButtonDisabled, setAddButtonDisabled] = useState(true)

    useEffect(() => {
        if (isApproval) return
        const noProgram = !programList.find(p =>
            p.orgUnits.includes(props.selected)
        )
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
                tables[props.match.params.status],
                props.selected,
                !isApproval
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
            {loading ? (
                <ProgressSection />
            ) : (
                <Card>
                    <RecordTable
                        data={data}
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
