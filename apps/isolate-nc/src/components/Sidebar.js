import React from 'react'
import styled from 'styled-components'

const Aside = styled.aside`
    background-color: #fff;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    min-height: calc(100vh - 48px);
`

export const Sidebar = ({ children }) => <Aside>{children}</Aside>
