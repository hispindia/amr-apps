import React from 'react'
import styled from 'styled-components'
import { Card } from '@dhis2/ui/core'
import { ButtonRow } from 'inputs'
import { Heading, Text } from 'helpers'

const Background = styled.div`
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: baseline;
    z-index: 1;
    padding-top: 62px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(33, 43, 54, 0.4);
`

const CustomCard = styled(Card)`
    width: 400px !important;
    height: auto !important;
    padding: 24px !important;
`

const CustomHeading = styled(Heading)`
    margin: 0;
`

export const ModalPopup = props => (
    <Background>
        <CustomCard>
            <CustomHeading>{props.heading}</CustomHeading>
            <Text>{props.text}</Text>
            <ButtonRow
                unspaced
                buttons={[
                    {
                        label: 'Cancel',
                        icon: 'clear',
                        kind: 'secondary',
                        onClick: () => props.onClick(false),
                    },
                    {
                        label: props.label,
                        icon: props.icon,
                        kind: props.kind,
                        onClick: () => props.onClick(true),
                    },
                ]}
            />
        </CustomCard>
    </Background>
)
