import styled from 'styled-components'

export const NoCaret = styled.span`
    user-select: none;
    &::before {
        content: '\\2007';
        display: inline-block;
        margin-right: 5px;
    }
`
