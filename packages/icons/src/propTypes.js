import { oneOf } from 'prop-types'
import { colors } from './colors'
import { icons } from './icons'

export const colorsPropType = oneOf(Object.keys(colors).map(key => colors[key]))
export const iconsPropType = oneOf(Object.keys(icons).map(key => icons[key]))
