import { get } from './crud'
import { request } from './request'
import { ORGANISM_ELEMENT, PERSON_TYPE, DEO_GROUP } from 'constants/dhis2'

const getUserData = async () =>
    await get(
        request('me', {
            fields: 'organisationUnits,userGroups,userCredentials[username]',
        })
    )

const getMetadata = async () =>
    await get(
        request('metadata', {
            order: 'level:asc',
            fields: [
                'children',
                'condition',
                'code',
                'dataElement',
                'displayName',
                'formName',
                'id',
                'name',
                'options',
                'organisationUnits',
                'path',
                'priority',
                'program',
                `programRuleActions[programRuleActionType,dataElement,
                optionGroup,content,trackedEntityAttribute,
                programStageSection,data]`,
                'programStage',
                `programStages[id,displayName,access,programStageDataElements[
                dataElement[id],compulsory],programStageSections[id,name,
                displayName,renderType,dataElements[id,displayFormName,
                code,valueType,optionSetValue,optionSet]]]`,
                `trackedEntityTypeAttributes[name,id,displayName,valueType,
                unique,optionSetValue,optionSet,mandatory,
                trackedEntityAttribute[name,id,displayName,valueType,
                unique,optionSetValue,optionSet]]`,
                'value',
            ],
            options: [
                'constants=true',
                'dataElements=true',
                'optionGroups=true',
                'options=true',
                'optionSets=true',
                'organisationUnits=true',
                'programRules=true',
                'programRuleVariables=true',
                'programs=true',
                'trackedEntityTypes=true',
            ],
        })
    )

const sortChildren = ou => {
    ou.children.forEach(c => sortChildren(c))
    ou.children.sort((a, b) =>
        a.displayName > b.displayName
            ? 1
            : b.displayName > a.displayName
            ? -1
            : 0
    )
}

export const initMetadata = async isIsolate => {
    // Replaces '#{xxx}' with 'this.state.values['id of xxx']'
    const programCondition = c => {
        const original = c
        try {
            const variableDuplicated = c.match(/#\{.*?\}/g)
            const variables = []
            if (!variableDuplicated) return c
            variableDuplicated.forEach(duplicated => {
                if (variables.indexOf(duplicated) === -1)
                    variables.push(duplicated)
            })
            variables.forEach(variable => {
                const name = variable.substring(2, variable.length - 1)
                const id = data.programRuleVariables.find(
                    ruleVariable => ruleVariable.name === name
                ).dataElement.id
                c = c.replace(
                    new RegExp('#{' + name + '}', 'g'),
                    "values['" + id + "']"
                )
            })
        } catch (e) {
            console.warn('Improper condition:', original)
        }
        return c
    }

    // Replaces 'A{xxx}' with 'this.state.values['id of xxx']'
    const entityCondition = c => {
        const variableDuplicated = c.match(/A\{.*?\}/g)
        const variables = []
        if (!variableDuplicated) return c
        variableDuplicated.forEach(duplicated => {
            if (variables.indexOf(duplicated) === -1) variables.push(duplicated)
        })

        variables.forEach(variable => {
            const id = attributeIds[variable.substring(2, variable.length - 1)]
            c = c.replace(/A\{.*?\}/g, "values['" + id + "']")
        })

        return c
    }

    const userData = await getUserData()

    const userGroups = userData.userGroups.map(userGroup => userGroup.id)
    const user = {
        username: userData.userCredentials.username,
        deoMember: userGroups.includes(DEO_GROUP),
    }
    const userOrgUnits = userData.organisationUnits.map(uo => uo.id)

    const data = await getMetadata()

    const orgUnits = []
    data.organisationUnits
        .filter(o => userOrgUnits.some(uo => o.path.includes(uo)))
        .forEach(o => {
            if (userOrgUnits.includes(o.id)) orgUnits.push(o)
            else {
                const ancestors = o.path.split('/').slice(1, -1)
                let ancestor = ancestors.shift()
                let parent = orgUnits.find(o => o.path.endsWith(ancestor))
                while (!parent) {
                    ancestor = ancestors.shift()
                    parent = orgUnits.find(o => o.path.endsWith(ancestor))
                }
                while (ancestors.length > 0) {
                    ancestor = ancestors.shift()
                    parent = parent.children.find(o => ancestor === o.id)
                }
                if (parent) {
                    const children = parent.children
                    children[children.findIndex(s => s.id === o.id)] = o
                }
            }
        })

    // Sorting descendants of each of the user's OU's.
    orgUnits.forEach(ou => sortChildren(ou))

    const options = {}
    data.options.forEach(
        o =>
            (options[o.id] = {
                label: o.displayName,
                value: o.code,
            })
    )

    const optionSets = {}
    data.optionSets.forEach(
        os => (optionSets[os.id] = os.options.map(o => options[o.id]))
    )
    data.optionGroups.forEach(
        os => (optionSets[os.id] = os.options.map(o => options[o.id]))
    )

    const person = data.trackedEntityTypes.find(type => (type.id = PERSON_TYPE))

    person.uniques = {}
    person.values = {}
    const attributeIds = {}
    person.trackedEntityTypeAttributes.forEach(a => {
        if (a.trackedEntityAttribute.unique)
            person.uniques[a.trackedEntityAttribute.id] = true
        person.values[a.trackedEntityAttribute.id] = ''
        a.hide = false
        attributeIds[a.trackedEntityAttribute.name] =
            a.trackedEntityAttribute.id
    })

    person.rules = []
    data.programRules
        .filter(r => r.programRuleActions.find(a => a.trackedEntityAttribute))
        .forEach(d => {
            if (!person.rules.find(rule => rule.name === d.name)) {
                d.condition = entityCondition(d.condition)
                person.rules.push(d)
            }
        })

    const programs = data.programs.filter(p => !p.name.includes('[IGNORE]'))

    const programList = []
    const stageLists = {}
    const programOrganisms = {}
    programs.forEach(p => {
        programList.push({
            value: p.id,
            label: p.name,
            orgUnits: p.organisationUnits.map(o => o.id),
        })
        const stages = []
        programOrganisms[p.id] = data.optionGroups.find(
            og => og.name === p.name
        ).id
        const remove = []
        p.programStages
            .filter(ps => ps.access.data.write)
            .forEach(ps => {
                stages.push({
                    value: ps.id,
                    label: ps.displayName,
                })
                ps.dataElements = {}
                ps.programStageDataElements.forEach(
                    d =>
                        (ps.dataElements[d.dataElement.id] = {
                            required: d.compulsory,
                            hide: false,
                        })
                )
                if (ps.dataElements[ORGANISM_ELEMENT])
                    ps.dataElements[ORGANISM_ELEMENT].hideWithValues = true
                ps.programStageSections.forEach(pss => {
                    if (pss.name.includes('[EDITABLE]')) {
                        pss.displayName = pss.name = pss.name.replace(
                            '[EDITABLE]',
                            ''
                        )
                        if (isIsolate) pss.editable = true
                    }
                    pss.dataElements.forEach(
                        d =>
                            (ps.dataElements[d.id] = {
                                ...ps.dataElements[d.id],
                                ...d,
                            })
                    )
                    pss.dataElements = pss.dataElements.map(d => d.id)
                    const childSections = []
                    ps.programStageSections
                        .filter(cs =>
                            cs.name.match(new RegExp('{' + pss.name + '}.*'))
                        )
                        .forEach(cs => {
                            remove.push(cs.id)
                            cs.name = cs.name.replace(
                                new RegExp('{' + pss.name + '}'),
                                ''
                            )
                            cs.editable = !!pss.editable
                            childSections.push(cs)
                        })
                    pss.childSections = childSections
                })
                ps.programStageSections = ps.programStageSections.filter(
                    s => !remove.includes(s.id)
                )
            })
        stageLists[p.id] = stages
    })

    let eventRules = []
    data.programRules
        .filter(r =>
            r.programRuleActions.find(
                a => a.dataElement || a.programStageSection
            )
        )
        .forEach(d => {
            d.condition = programCondition(d.condition)
            eventRules.push(d)
        })
    eventRules = eventRules.sort((a, b) =>
        a.priority > b.priority || !a.priority ? 1 : -1
    )

    const constants = {}
    if (data.constants)
        data.constants.forEach(c => {
            if (c.code) constants[c.code] = c.value
        })

    const dataElements = {}
    data.dataElements.forEach(
        de => (dataElements[de.id] = de.formName ? de.formName : de.displayName)
    )

    return {
        optionSets,
        person,
        programs,
        programList,
        stageLists,
        programOrganisms,
        constants,
        dataElements,
        orgUnits,
        user,
        eventRules,
    }
}
