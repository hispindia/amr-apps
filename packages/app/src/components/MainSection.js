import styled from 'styled-components'

export const MainSection = styled.main`
    width: 100%;
    overflow-x: auto;
    padding: ${({ padded }) => (padded ? '16px 4%' : '16px 32px')};
`
