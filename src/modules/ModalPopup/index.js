import React from 'react'
import { element, func, oneOf, oneOfType, string } from 'prop-types'
import { ButtonRow } from 'inputs'
import { Text } from 'styles'
import { Background, CustomCard, CustomHeading } from './style'

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

ModalPopup.propTypes = {
    heading: string.isRequired,
    onClick: func.isRequired,
    label: string.isRequired,
    icon: string.isRequired,
    text: oneOfType([string, element]).isRequired,
    kind: oneOf(['default', 'basic', 'secondary', 'primary', 'destructive'])
        .isRequired,
}
