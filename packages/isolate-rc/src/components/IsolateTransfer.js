import React from 'react'
import styled from 'styled-components'
import { App, MainSection, Row, store, reducers } from '@hisp-amr/app'
import { OrgUnitTree } from '@hisp-amr/org-unit-tree'
import { Card } from '@dhis2/ui-core'
import 'typeface-roboto'

/*const isolateReducers = {
    alert: reducers.alert,
    metadata: reducers.metadata,
    data: reducers.data,
}*/

const Sidebar = styled.aside`
    display: flex;
    flex-direction: column;
    padding: 16px;
`

export const PaddedCard = styled(Card)`
    padding: 8px;
`

const onError = error => console.error(error)
const onSelect = selected => console.log(selected)

export const IsolateTransfer = () => (
    <App appName="Isolate Transfer" store={store({ alert: reducers.alert })}>
        <Row>
        <Sidebar>
            <PaddedCard>
                <OrgUnitTree onSelect={onSelect} onError={onError} />
            </PaddedCard>
        </Sidebar>
        <MainSection>Hello</MainSection>
        </Row>
    </App>
)
