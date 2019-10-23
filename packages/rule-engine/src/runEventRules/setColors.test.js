import { setColors } from './setColors'
import { dataElements, values } from '../__test__'

const result = 'KmgWX65h0iM'
const mic = 'GYNpOJWcNx2'
const dd = 'VGdJnkTlNyK'
const condition = `values['${mic}'] || values['${dd}']`

describe('setColors', () => {
    it('does not set any colors when the affected data element is not a test value', () => {
        setColors(
            dataElements,
            { ...values, [mic]: '30' },
            {
                condition,
                affected: { ...dataElements[result], optionSet: 'id' },
                value: '',
            }
        )

        return expect(dataElements[mic].color).toEqual('')
    })

    it('removes the color when the value is empty', () => {
        setColors(
            dataElements,
            { ...values, [mic]: '30' },
            {
                condition,
                affected: dataElements[result],
                value: '',
            }
        )

        return expect(dataElements[mic].color).toEqual('')
    })

    it('sets the color to red when the value is resistant', () => {
        setColors(
            dataElements,
            { ...values, [mic]: '30' },
            {
                condition,
                affected: dataElements[result],
                value: 'Resistant',
            }
        )

        return expect(dataElements[mic].color).toEqual('red')
    })

    it('sets the color to yellow when the value is intermediate', () => {
        setColors(
            dataElements,
            { ...values, [mic]: '30' },
            {
                condition,
                affected: dataElements[result],
                value: 'Intermediate',
            }
        )

        return expect(dataElements[mic].color).toEqual('yellow')
    })

    it('sets the color to green when the value is susceptible', () => {
        setColors(
            dataElements,
            { ...values, [mic]: '30' },
            {
                condition,
                affected: dataElements[result],
                value: 'Susceptible',
            }
        )

        return expect(dataElements[mic].color).toEqual('green')
    })

    it('removes the color and sets warning for dd element if there is an mic value', () => {
        setColors(
            dataElements,
            { ...values, [mic]: '30', [dd]: '30' },
            {
                condition,
                affected: dataElements[result],
                value: 'Susceptible',
            }
        )

        return (
            expect(dataElements[mic].color).toEqual('green') &&
            expect(dataElements[dd].color).toEqual('') &&
            expect(dataElements[mic].warning).toEqual(
                'MIC is prioritized over DD'
            )
        )
    })
})
