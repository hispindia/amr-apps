import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { CREATE, DISPATCH } from '../../constants/statuses'

const Article = styled.article`
    margin-top: 16px;
`

const Centered = styled.span`
    text-align: center;
    display: block;
    line-height: 2rem;
`

const Spacing = styled.main`
    margin: 0 auto;
    width: 90%;
`

const Span = styled.span`
    display: block;
    line-height: 2rem;
`

const Table = styled.table`
    width: 100%;
    margin-top: 16px;
`

const Tr = styled.tr`
    line-height: 2rem;
`

const Th = styled.th`
    text-align: left;
`

const Td = styled.td`
    text-align: left;
`

export const PrintContent = ({ data, forwardRef }) => {
    const orgUnit = useSelector(state => state.selectedOrgUnit)

    return (
        <Article ref={forwardRef}>
            <Centered>ICMR AMR Surveillance Network</Centered>
            <Centered>Sample Transfer Regional Center to Nodal Center</Centered>
            {data.status === CREATE && <Centered>(Draft List)</Centered>}
            {data.status === DISPATCH && <Centered>(Final List)</Centered>}
            <Spacing>
                {data.dispatchDate && (
                    <Span>Dispatched: {data.dispatchDate}</Span>
                )}
                <Span>Regional Center: {orgUnit.displayName}</Span>
                <Span>Nodal Center: {data.program.displayName}</Span>
                <Span>Samples: {data.rows.selectedArray.length}</Span>
                <Span>Batch: {data.BatchNo}</Span>
                <Table>
                    <thead>
                        <Tr>
                            <Th>Serial Number</Th>
                            <Th>AMR ID</Th>
                            <Th>Organism</Th>
                            <Th>Sample Type</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {data.rows.selectedArray.map(
                            ({ amrid, organism, sampletype }, index) => (
                                <Tr key={amrid}>
                                    <Td>{index + 1}</Td>
                                    <Td>{amrid}</Td>
                                    <Td>{organism}</Td>
                                    <Td>{sampletype}</Td>
                                </Tr>
                            )
                        )}
                    </tbody>
                </Table>
            </Spacing>
        </Article>
    )
}
