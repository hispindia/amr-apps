import React from 'react'
import { CircularLoader } from '@dhis2/ui-core'
import { Overlay } from './style'

export const OverlayedSpinner = () => (
    <Overlay>
        <CircularLoader large />
    </Overlay>
)
