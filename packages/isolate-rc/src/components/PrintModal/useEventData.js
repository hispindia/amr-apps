import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '@hisp-amr/app'
import { getEventData } from '../../api'
import { ORGANISM_OPTION_SET } from '../../constants/ids'

export const useEventData = batch => {
    const dispatch = useDispatch()

    const optionSets = useSelector(state => state.metadata.optionSets)

    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getData = async eventIds => {
            setLoading(true)
            try {
                const response = await Promise.all(
                    eventIds.map(async e => await getEventData(e))
                )
                const eventData = response.map(({ listGrid }) => listGrid.rows)

                const organisms = optionSets.find(
                    o => o.id === ORGANISM_OPTION_SET
                ).options

                setData({
                    ...batch,
                    rows: {
                        ...batch.rows,
                        selectedArray: batch.rows.selectedArray.map(s => ({
                            ...s,
                            sampletype: eventData.find(
                                e => e[0][0] === s.eventuid
                            )[0][2],
                            organism: organisms.find(
                                o =>
                                    o.code ===
                                    eventData.find(
                                        e => e[1][0] === s.eventuid
                                    )[1][2]
                            ).name,
                        })),
                    },
                })
            } catch (e) {
                console.error(e)
                setError(e)
                dispatch(
                    showAlert('Failed to get batch data', {
                        critical: true,
                    })
                )
            } finally {
                setLoading(false)
            }
        }

        if (batch)
            getData(batch.rows.selectedArray.map(({ eventuid }) => eventuid))
    }, [batch])

    return { data, loading, error }
}
