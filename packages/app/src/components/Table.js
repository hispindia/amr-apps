import React from 'react'
import { arrayOf, func, object, shape, string, bool } from 'prop-types'
import styled, { css } from 'styled-components'
import { Card } from '@dhis2/ui-core'
import MUIDataTable from 'mui-datatables'

const StyledCard = styled(Card)`
    height: unset !important;
    ${({ noShadow }) => {
        if (noShadow)
            return css`
                box-shadow: none !important;
            `
    }}
`

/**
 * Table containg the persons events.
 */
export const Table = ({ rows, headers, onRowClick, title, noShadow }) => (
    <StyledCard noShadow={noShadow}>
        <MUIDataTable
            title={title}
            data={rows}
            columns={headers}
            options={{
                selectableRows: 'none',
                elevation: 0,
                onRowClick: onRowClick,
                responsive: 'stacked',
                rowHover: !!onRowClick,
            }}
            className={!onRowClick ? 'no-hover' : ''}
        />
    </StyledCard>
)

Table.propTypes = {
    onRowClick: func,
    rows: arrayOf(arrayOf(string)).isRequired,
    headers: arrayOf(
        shape({
            name: string.isRequired,
            options: object,
        })
    ).isRequired,
    title: string,
    boxShadow: bool,
}
