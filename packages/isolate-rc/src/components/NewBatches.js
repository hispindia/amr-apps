import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LoadingSection, Table, TitleRow, showAlert } from '@hisp-amr/app'
import { getBatches } from '../api'
import { toNewBatches } from '../utils/toNewBatches'

const headers = [
    { name: 'Batch' },
    { name: 'AMR IDs' },
    { name: 'Organism group' },
    { name: 'Created' },
]

export const NewBatches = () => {
    const dispatch = useDispatch()

    const selected = useSelector(state => state.selectedOrgUnit)

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const response = await getBatches(selected.code)
                if (response.httpStatusCode === 404) throw 404
                setData(toNewBatches(response[selected.code]))
                setError(false)
            } catch (e) {
                if (e === 404) {
                    setData([])
                    setError(false)
                } else {
                    console.error(e)
                    dispatch(
                        showAlert('Failed to get sample batches', {
                            critical: true,
                        })
                    )
                    setError(true)
                }
            } finally {
                setLoading(false)
            }
        }

        if (selected && selected.code) getData()
    }, [selected])

    const onClick = param => console.log(param)

    return (
        <>
            <TitleRow title="New sample batches" />
            {!error &&
                (loading ? (
                    <LoadingSection />
                ) : (
                    <Table headers={headers} rows={data} onRowClick={onClick} />
                ))}
        </>
    )
}
