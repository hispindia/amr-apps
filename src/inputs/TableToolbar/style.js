import IconButton from '@material-ui/core/IconButton'
import styled, { css } from 'styled-components'

/**
 * DHIS2 styled icons.
 */
export const IconContainer = styled(IconButton)`
    color: white !important;
    background: linear-gradient(180deg, #1565c0, #0650a3);
    border: 1px solid var(--primary800);
    &:hover {
        background: linear-gradient(180deg, #054fa3, #034793);
    }
    ${props =>
        props.disabled &&
        css`
            opacity: 0.33;
        `}
`
