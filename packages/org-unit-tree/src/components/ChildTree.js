import styled, { css } from 'styled-components'

export const ChildTree = styled.ul`
    list-style-type: none;
    padding-left: 20px;
    ${props =>
        !props.opened &&
        css`
            display: none;
        `}
`
