import styled from 'styled-components'

export const MainSection = styled.main`
    width: 100%;
    padding: ${({ padded }) => (padded ? '16px 4%' : '16px')};
`
