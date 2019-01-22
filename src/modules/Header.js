import React from 'react'
import HeaderBar from '@dhis2/ui/widgets/HeaderBar'


export class Header extends React.Component {
    static id = 'headerbar'

    render() {
        return (
                <HeaderBar appName='AMR'/>
        )
    }
}
