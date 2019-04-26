import moment from 'moment'
import { get, post, del, put, setBaseUrl } from './crud'
import {
    getProgramStage,
    getEventValues,
    setEventValues,
    generateAmrId,
    request,
    getSqlView,
} from './internal'

export const _organismsDataElementId = 'SaQe2REkGVw'
export const _testResultDataElementId = 'bSgpKbkbVGL'
export const _sampleIdElementId = 'GpAu5HjWAEz'
const _amrDataElement = 'lIkk661BLpG'

const _personTypeId = 'tOJvIFXsB5V'

const _l1ApprovalStatus = 'tAyVrNUTVHX'
const _l1RevisionReason = 'wCNQtIHJRON'
const _l2ApprovalStatus = 'sXDQT6Yaf77'
const _l2RevisionReason = 'fEnFVvEFKVc'

const _deoGroup = 'mYdK5QT4ndl'
const _l1ApprovalGroup = 'jVK9RNKNLus'
const _l2ApprovalGroup = 'TFmNnLn06Rd'

let _isDeoUser
let _isL1User
let _isL2User

let _username = ''

/**
 * Sets the base URL, username, and user groups.
 * @param {String} baseUrl - Base URL.
 */
export const init = baseUrl => setBaseUrl(baseUrl)

export const initMetadata = async () => {
    // Replaces '#{xxx}' with 'this.state.values['id of xxx']'
    const programCondition = c => {
        const original = c
        try {
            const variableDuplicated = c.match(/#\{.*?\}/g)
            let variables = []
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
        } catch {
            console.warn('Improper condition:', original)
        }
        return c
    }

    // Replaces 'A{xxx}' with 'this.state.values['id of xxx']'
    const entityCondition = c => {
        const variableDuplicated = c.match(/A\{.*?\}/g)
        let variables = []
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

    const user = await get(
        request('me', {
            fields: 'organisationUnits,userGroups,userCredentials[username]',
        })
    )
    _username = user.userCredentials.username
    const userGroups = user.userGroups.map(userGroup => userGroup.id)
    _isDeoUser = userGroups.includes(_deoGroup)
    _isL1User = userGroups.includes(_l1ApprovalGroup)
    _isL2User = userGroups.includes(_l2ApprovalGroup)
    const userOrgUnits = user.organisationUnits.map(uo => uo.id)

    let data = await get(
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
                `programStages[id,displayName,programStageDataElements[
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

    let orgUnits = []
    data.organisationUnits
        .filter(o => userOrgUnits.some(uo => o.path.includes(uo)))
        .forEach(o => {
            if (userOrgUnits.includes(o.id)) orgUnits.push(o)
            else {
                let ancestors = o.path.split('/').slice(1, -1)
                let ancestor = ancestors.shift()
                let parent = orgUnits.find(o => ancestor === o.id)
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

    // Sorts the children of the OU by display name.
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

    // Sorting descendants of each of the user's OU's.
    orgUnits.forEach(ou => sortChildren(ou))

    let options = {}
    data.options.forEach(
        o =>
            (options[o.id] = {
                label: o.displayName,
                value: o.code,
            })
    )

    let optionSets = {}
    data.optionSets.forEach(
        os => (optionSets[os.id] = os.options.map(o => options[o.id]))
    )
    data.optionGroups.forEach(
        os => (optionSets[os.id] = os.options.map(o => options[o.id]))
    )

    let person = data.trackedEntityTypes.find(type => (type.id = _personTypeId))

    person.uniques = {}
    person.values = {}
    let attributeIds = {}
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

    let programs = data.programs

    let programList = []
    let stageLists = {}
    let programOrganisms = {}
    programs.forEach(p => {
        programList.push({
            value: p.id,
            label: p.name,
            orgUnits: p.organisationUnits.map(o => o.id),
        })
        let stages = []
        programOrganisms[p.id] = data.optionGroups.find(
            og => og.name === p.name
        ).id
        let remove = []
        p.programStages.forEach(ps => {
            stages.push({
                value: ps.id,
                label: ps.displayName,
            })
            ps.programStageSections.forEach(pss => {
                if (pss.dataElements) {
                    let orgDataElement = pss.dataElements.find(
                        de => de.id === _organismsDataElementId
                    )
                    if (orgDataElement) orgDataElement.hideWithValues = true
                }
                let childSections = []
                ps.programStageSections
                    .filter(childSection =>
                        childSection.name.match(
                            new RegExp('{' + pss.name + '}.*')
                        )
                    )
                    .forEach(childSection => {
                        remove.push(childSection.id)
                        childSection.name = childSection.name.replace(
                            new RegExp('{' + pss.name + '}'),
                            ''
                        )
                        childSections.push(childSection)
                    })
                pss.childSections = childSections
            })
            ps.programStageSections = ps.programStageSections.filter(
                s => !remove.includes(s.id)
            )
            let resultSection = ps.programStageSections.find(
                s => s.name === 'Result'
            )
            if (resultSection) resultSection.hideWithValues = true
        })
        stageLists[p.id] = stages
    })

    programs.rules = []
    data.programRules
        .filter(r =>
            r.programRuleActions.find(
                a => a.dataElement || a.programStageSection
            )
        )
        .forEach(d => {
            d.condition = programCondition(d.condition)
            programs.rules.push(d)
        })
    programs.rules = programs.rules.sort((a, b) =>
        a.priority > b.priority || !a.priority ? 1 : -1
    )

    let constants = {}
    if (data.constants)
        data.constants.forEach(c => {
            if (c.code) constants[c.code] = c.value
        })

    let dataElements = {}
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
    }
}

/**
 * Checks if any tracked entity instance has property with value.
 * @param {string} property - Property.
 * @param {string} value - Value.
 * @returns {boolean} - False if unique, tracked entity instance ID otherwise.
 */
export const checkUnique = async (property, value, ou) => {
    const entities = (await get(
        request('trackedEntityInstances', {
            fields: 'trackedEntityInstance',
            filters: `${property}:eq:${value}`,
            options: [`ou=${ou}`, `trackedEntityType=${_personTypeId}`],
        })
    )).trackedEntityInstances
    return !entities
        ? false
        : entities.length > 0
        ? entities[0].trackedEntityInstance
        : false
}

/**
 * Gets tracked entity instance values.
 * @param {string} entityId - Tracked entity instance ID.
 * @returns {Object} Values.
 */
export const getPersonValues = async entityId => {
    const attributes = (await get(
        request(`trackedEntityInstances/${entityId}`, {
            fields: 'attributes[code,displayName,valueType,attribute,value]',
            options: ['ouMode=ALL'],
        })
    )).attributes

    if (!attributes) return null

    let values = {}
    attributes.forEach(a => (values[a.attribute] = a.value))

    return values
}

/**
 * Adds a new person..
 * @param {Object} values - Values
 * @returns {string} Tracked entity instance ID.
 */
export const addPerson = async (values, orgUnit) => {
    let data = {
        trackedEntityType: _personTypeId,
        orgUnit: orgUnit,
        attributes: [],
    }
    for (let key in values)
        data.attributes.push({ attribute: key, value: values[key] })

    return (await (await post('trackedEntityInstances', data)).json()).response
        .importSummaries[0].reference
}

/**
 * Updates a person.
 * @param {string} id - Tracked entity instance id.
 * @param {Object} values - Values.
 */
export const updatePerson = async (id, values) => {
    const url = `trackedEntityInstances/${id}`
    let data = await get(url)
    data.attributes = []
    for (let key in values)
        data.attributes.push({ attribute: key, value: values[key] })

    await put(url, data)
}

/**
 * Deletes a tracked entity instance.
 * @param {string} id - Tracked entity instance.
 */
export const deletePerson = async id =>
    await del(`trackedEntityInstances/${id}`)

export const newRecord = async (
    pId,
    pStage,
    orgaCode,
    ou,
    eId,
    eValues,
    sampleDate,
    orgUnitCode
) => {
    let initialValues = {
        [_organismsDataElementId]: orgaCode,
        [_amrDataElement]: await generateAmrId(ou, orgUnitCode),
    }
    const { entityId, eventId } = eId
        ? await addEvent(
              initialValues,
              pId,
              pStage.id,
              ou,
              eId,
              eValues,
              sampleDate
          )
        : await addPersonWithEvent(
              initialValues,
              pId,
              pStage.id,
              ou,
              eValues,
              sampleDate
          )

    const { programStage, eventValues, status } = await getProgramStage(
        pStage,
        initialValues,
        false,
        true
    )

    return { programStage, eventValues, status, eventId, entityId }
}

export const existingRecord = async (programs, eventId, isApproval) => {
    let {
        eventValues: initialValues,
        programId,
        programStageId,
        completed,
        entityId,
        sampleDate,
    } = await getEventValues(eventId)
    const pStage = programs
        .find(p => p.id === programId)
        .programStages.find(ps => (ps.id = programStageId))
    const { programStage, eventValues, status } = !isApproval
        ? await getProgramStage(pStage, initialValues, completed, false)
        : await getProgramStage(
              pStage,
              initialValues,
              completed,
              false,
              _isL1User,
              _isL2User
          )
    return {
        programId,
        programStage,
        eventValues,
        status,
        eventId,
        entityId,
        sampleDate,
    }
}

export const addPersonWithEvent = async (
    eventValues,
    programId,
    programStageId,
    orgUnitId,
    entityValues,
    sampleDate
) => {
    let event = await setEventValues(
        {
            dataValues: [],
            eventDate: sampleDate,
            orgUnit: orgUnitId,
            program: programId,
            programStage: programStageId,
            status: 'ACTIVE',
        },
        eventValues
    )

    let data = {
        trackedEntityType: _personTypeId,
        orgUnit: event.orgUnit,
        attributes: Object.keys(entityValues).map(key => {
            return { attribute: key, value: entityValues[key] }
        }),
        enrollments: [
            {
                orgUnit: event.orgUnit,
                program: event.program,
                enrollmentDate: sampleDate,
                incidentDate: sampleDate,
                events: [event],
            },
        ],
    }

    const r = await post('trackedEntityInstances', data)

    return {
        entityId: r.response.importSummaries[0].reference,
        eventId:
            r.response.importSummaries[0].enrollments.importSummaries[0].events
                .importSummaries[0].reference,
    }
}

/**
 * Adds a new event. Enrolls person if not already enrolled.
 * @param {Object[]} eventValues - Values.
 * @param {string} programId - Program ID.
 * @param {string} programStageId - Program stage ID.
 * @param {string} orgUnitId - Organisation unit ID.
 * @param {string} entityId - Tracked entity instance ID.
 * @param {string} entityValues - Entity values.
 */
export const addEvent = async (
    eventValues,
    programId,
    programStageId,
    orgUnitId,
    entityId,
    entityValues,
    sampleDate
) => {
    let event = await setEventValues(
        {
            dataValues: [],
            eventDate: sampleDate,
            orgUnit: orgUnitId,
            program: programId,
            programStage: programStageId,
            trackedEntityInstance: entityId,
            status: 'ACTIVE',
        },
        eventValues
    )

    if (entityValues) await updatePerson(entityId, entityValues)

    // Enrolling if not already enrolled.
    let enrollments = []
    enrollments = (await get(
        request(`trackedEntityInstances/${entityId}`, {
            fields: 'enrollments[program]',
        })
    )).enrollments
    if (!enrollments.find(enrollment => enrollment.program === programId)) {
        await post('enrollments', {
            trackedEntityInstance: entityId,
            orgUnit: orgUnitId,
            program: programId,
            enrollmentDate: sampleDate,
            incidentDate: sampleDate,
        })
    }

    const r = await post('events', event)

    return {
        entityId,
        eventId: r.response.importSummaries[0].reference,
    }
}

export const setEventStatus = async (eventId, completed, isApproval) => {
    const url = `events/${eventId}`

    let event = await get(url)
    event.status = completed ? 'COMPLETED' : 'ACTIVE'
    if (!isApproval) {
        let values = {}
        event.dataValues.forEach(
            dataValue => (values[dataValue.dataElement] = dataValue.value)
        )
        if (values[_l1ApprovalStatus] === 'Resend') {
            values[_l1ApprovalStatus] = ''
            values[_l1RevisionReason] = ''
        }
        if (values[_l2ApprovalStatus] === 'Resend') {
            values[_l2ApprovalStatus] = ''
            values[_l2RevisionReason] = ''
        }
        event = await setEventValues(event, values)
    }
    await put(url, event)
}

export const updateEventValue = (eventId, dataElementId, value) =>
    put(`events/${eventId}/${dataElementId}`, {
        dataValues: [{ dataElement: dataElementId, value: value }],
    })

/**
 * Deletes event.
 * @param {string} eventId - Event ID.
 */
export const deleteEvent = async eventId => await del(`events/${eventId}`)

export const getEvents = async (config, orgUnit, userOnly) =>
    await getSqlView(
        config.sqlViews.table.length === 1
            ? config.sqlViews.table[0]
            : _isL2User
            ? config.sqlViews.table[1]
            : config.sqlViews.table[0],
        orgUnit,
        {
            user: userOnly ? _username : false,
            status: config.param ? config.status : false,
        }
    )

export const getCounts = async (configs, orgUnit, userOnly) => {
    for (let config of configs)
        config.count = (await getSqlView(
            config.sqlViews.count.length === 1
                ? config.sqlViews.count[0]
                : _isL2User
                ? config.sqlViews.count[1]
                : config.sqlViews.count[0],
            orgUnit,
            {
                user: userOnly ? _username : false,
                status: config.param ? config.status : false,
            }
        ))[0][0]
    return configs
}

export const isDuplicate = async (
    event,
    entity,
    programStage,
    organism,
    sampleId,
    date,
    days
) => {
    let events = (await get(
        request('events/query', {
            order: 'created:asc',
            filters: [
                `${_sampleIdElementId}:eq:${sampleId}`,
                `${_organismsDataElementId}:eq:${organism}`,
            ],
            options: [
                `trackedEntityInstance=${entity}`,
                `programStage=${programStage}`,
            ],
        })
    )).rows

    if (!events) return false
    if (events.length < 1) return false
    if (events[0][0] === event) return false
    events = events.filter(e => e[0] !== event)
    if (events.length < 1) return false

    days = parseInt(days)
    date = moment(date)
    const min = date.clone().subtract(days, 'days')
    const max = date.clone().add(days, 'days')
    return events.find(e => moment(e[7]) > min && moment(e[7]) < max) !== null
}
