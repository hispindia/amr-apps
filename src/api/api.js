import { get, post, postData, put, patch, del } from "./crud";


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