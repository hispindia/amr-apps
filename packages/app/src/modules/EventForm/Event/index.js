import React from 'react'
import { useSelector } from 'react-redux'
import { LoadingSection } from 'components'
import { Section } from './Section'
import { ERROR } from '../../../constants/statuses'

export const Event = () => {
    const programStage = useSelector(state => state.data.event.programStage)
    const eventId = useSelector(state => state.data.event.id)
    const panelValid = useSelector(state => state.data.panel.valid)
    const error = useSelector(state => state.data.status) === ERROR

    if (!panelValid) return null

    if (!eventId) return <LoadingSection />

    return (
        <>
            {programStage.programStageSections
                .filter(s => !s.hide && !s.hideWithValues)
                .map(s => (
                    <Section
                        key={s.id}
                        heading={s.displayName}
                        dataElements={s.dataElements}
                        childSections={s.childSections}
                        renderType={s.renderType.DESKTOP.type}
                    />
                ))}
        </>
    )
}
