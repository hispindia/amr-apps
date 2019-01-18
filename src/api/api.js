import { get, post, postData, put, patch, del } from "./crud";


export async function getPatient(patientRegNr) {
    try {
        const attributes = (await get('trackedEntityInstances.json?ouMode=ALL&fields=attributes[code,displayName,valueType,attribute,value]&filter=RkCL8PAxV22:eq:'
            + patientRegNr)).trackedEntityInstances[0].attributes;
        let patientData = {};
        for (let i = 0; i < attributes.length; i++) {
            switch(attributes[i].attribute) {
                case 'jfydZttH7ls':
                    patientData.state = attributes[i].value;
                case 'ZVHlQMTW21F':
                    patientData.locationType = attributes[i].value;
                case 'RkCL8PAxV22':
                    patientData.patientRegNr = attributes[i].value;
                case 'Lv4xbLkG39P':
                    patientData.dateOfBirth = attributes[i].value;
                case 'BY9hgWTrq8V':
                    patientData.gender = attributes[i].value;
                case 'DOxUystmutC':
                    patientData.city = attributes[i].value;
                case 'OkKucSXfbQ2':
                    patientData.district = attributes[i].value;
            }
        }
        return patientData;
    }
    catch {
        return null;
    }
}