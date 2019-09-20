import React from 'react'
import { func } from 'prop-types'
import styled from 'styled-components'
import { Button } from '@dhis2/ui-core'
import { Icon } from '@hisp-amr/app'

const MiniButton = styled(Button)`
    padding: 0 !important;
    width: 36px;
    margin: 4px 8px;
`

const ButtonCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const TransferButtons = ({ onLeft, onRight, onSwitch }) => (
    <ButtonCol>
        <MiniButton onClick={onLeft}>
            <Icon icon="chevron_left" />
        </MiniButton>
        <MiniButton onClick={onRight}>
            <Icon icon="chevron_right" />
        </MiniButton>
        <MiniButton onClick={onSwitch}>
            <Icon icon="code" />
        </MiniButton>
    </ButtonCol>
)

TransferButtons.propTypes = {
    onLeft: func.isRequired,
    onRight: func.isRequired,
    onSwitch: func.isRequired,
}
