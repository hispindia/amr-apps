import React from 'react'
import styled from 'styled-components'
import { CircularLoader } from '@dhis2/ui-core'

const Overlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

export const OverlayedLoader = () => (
    <Overlay>
        <CircularLoader large />
    </Overlay>
)
