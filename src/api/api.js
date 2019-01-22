import { get, postData, getNonApi } from "./crud";
import * as moment from 'moment';

let amrId = '';
let personId = '';

export async function setAmrProgram() {
    const program = (await get('programs.json?filter=shortName:eq:AMR&paging=false&fields=id,trackedEntityType'))
        .programs[0];
    amrId = program.id;
    personId = program.trackedEntityType.id;
    console.log(amrId)
    console.log(personId)
}

export async function getProgramAttributes() {
    return (await get('programs/' + amrId
        + '/programTrackedEntityAttributes.json?fields=mandatory,trackedEntityAttribute[code,displayName,valueType,id,unique,name,optionSetValue,optionSet[options[code,name,id,displayName]]]'))
        .programTrackedEntityAttributes;
}

export async function isUnique(property, value) {
    return (await get('trackedEntityInstances.json?ouMode=ALL&fields=attributes[code,displayName,valueType,attribute,value]&filter='
        + property + ':eq:' + value)).trackedEntityInstances.length === 0;
}

export async function getPatient(patientRegNr) {
    try {
        const attributes = (await get('trackedEntityInstances.json?ouMode=ALL&fields=attributes[code,displayName,valueType,attribute,value]&filter=RkCL8PAxV22:eq:'
            + patientRegNr)).trackedEntityInstances[0].attributes;
        let patientData = {};
        for (let i = 0; i < attributes.length; i++) {
            switch(attributes[i].attribute) {
                case 'DOxUystmutC':
                    patientData.city = attributes[i].value;
                    break;
                case 'Lv4xbLkG39P':
                    patientData.dateOfBirth = attributes[i].value;
                    break;
                case 'OkKucSXfbQ2':
                    patientData.district = attributes[i].value;
                    break;
                case 'BY9hgWTrq8V':
                    patientData.gender = attributes[i].value;
                    break;
                case 'ZVHlQMTW21F':
                    patientData.locationType = attributes[i].value;
                    break;
                case 'RkCL8PAxV22':
                    patientData.patientRegistrationNumber = attributes[i].value;
                    break;
                case 'jfydZttH7ls':
                    patientData.state = attributes[i].value;
                    break;
                default:
                    break;
            }
        }
        return patientData;
    }
    catch {
        return null;
    }
}

export async function addPatient(values) {
    const orgUnit = "ANGhR1pa8I5";
    const now = moment().format("YYYY-MM-DD");
    let data = {
        trackedEntityType: personId,
        orgUnit: orgUnit,
        attributes: [],
        enrollments: [{
            orgUnit: orgUnit,
            program: amrId,
            enrollmentDate: now,
            incidentDate: now
        }]
    };
    for(let key in values)
        data.attributes.push({ attribute: key, value: values[key] });
    console.log(await postData('trackedEntityInstances/', data));
}

export async function getAllPatients() {
    console.log('hello')
    console.log(amrId)
    let data = await get('trackedEntityInstances/query.json?ouMode=ALL&order=created:desc&paging=false&program=' + amrId);
    for (let i = 0; i < data.headers.length; i++)
        data.headers[i].name = data.headers[i].column;
    data.headers[0].options = { display: false };
    data.headers[1].options = { display: false };
    data.headers[2].options = { display: false };
    data.headers[3].options = { display: false };
    data.headers[5].options = { display: false };
    data.headers[6].options = { display: false };
    return data;
}

export async function getStates() {
    return (await get('optionSets.json?paging=false&fields=options[name,displayName,id]&filter=code:eq:State'))
        .optionSets[0].options;
}

export async function getDistricts(state) {
    return (await get('optionSets.json?paging=false&fields=options[name,displayName,id]&filter=code:eq:'
        + state)).optionSets[0].options;
}

