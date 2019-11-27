import { assignDataValues } from './assignDataValues'
import {
    CORRESPONDING_EVENT_ELEMENT,
    EVENT_TYPE_ELEMENT,
} from '../../constants/dhis2'

const foobar = {
    dataElement: 'foo',
    value: 'bar',
}

describe('assignDataValues', () => {
    it('adds the correct values', () => {
        const eventId = 'eventId'
        const eventType = 'TYPE'
        const received = [foobar, foobar]
        const expected = [
            foobar,
            foobar,
            {
                dataElement: CORRESPONDING_EVENT_ELEMENT,
                value: eventId,
            },
            {
                dataElement: EVENT_TYPE_ELEMENT,
                value: eventType,
            },
        ]

        return expect(assignDataValues(received, eventId, eventType)).toEqual(
            expected
        )
    })
})

describe('assignDataValues', () => {
    it('modifies the correct values', () => {
        const eventId = 'eventId'
        const eventType = 'TYPE'
        const received = [
            foobar,
            foobar,
            {
                dataElement: CORRESPONDING_EVENT_ELEMENT,
                value: 'foo',
            },
            {
                dataElement: EVENT_TYPE_ELEMENT,
                value: 'bar',
            },
        ]
        const expected = [
            foobar,
            foobar,
            {
                dataElement: CORRESPONDING_EVENT_ELEMENT,
                value: eventId,
            },
            {
                dataElement: EVENT_TYPE_ELEMENT,
                value: eventType,
            },
        ]

        return expect(assignDataValues(received, eventId, eventType)).toEqual(
            expected
        )
    })
})

describe('assignDataValues', () => {
    it('removes both values', () => {
        const received = [
            foobar,
            foobar,
            {
                dataElement: CORRESPONDING_EVENT_ELEMENT,
                value: 'eventId',
            },
            {
                dataElement: EVENT_TYPE_ELEMENT,
                value: 'EVENT',
            },
        ]
        const expected = [
            foobar,
            foobar,
            {
                dataElement: CORRESPONDING_EVENT_ELEMENT,
                value: '',
            },
            {
                dataElement: EVENT_TYPE_ELEMENT,
                value: '',
            },
        ]

        return expect(assignDataValues(received, '', '')).toEqual(expected)
    })
})
