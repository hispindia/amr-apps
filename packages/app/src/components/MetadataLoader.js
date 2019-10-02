import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bool, func, node } from 'prop-types'
import { OverlayedLoader } from './OverlayedLoader'
import { setMetadata } from 'actions'
import { ERROR, LOADING } from 'constants/statuses'

export const MetadataLoader = ({ isIsolate, children, action }) => {
    const dispatch = useDispatch()
    const status = useSelector(state => state.metadata.status)

    useEffect(() => {
        if (action) action()
        else dispatch(setMetadata(isIsolate))
    }, [])

    if (status === ERROR) return null

    if (status === LOADING) return <OverlayedLoader />

    return children
}

MetadataLoader.propTypes = {
    isIsolate: bool,
    children: node.isRequired,
    action: func,
}
