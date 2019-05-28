import React from 'react'
import { CircularProgress } from '@dhis2/ui-core'
import { Overlay } from './style'

export const OverlayedSpinner = () => (
    <Overlay>
        <CircularProgress large />
    </Overlay>
)
