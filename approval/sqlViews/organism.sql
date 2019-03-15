export async function fixOrganisms() {
    const events = (await get('sqlViews/EneatwefoAq/data.json?paging=false')).listGrid.rows
    const options = (await get('optionSets/TUCsBvqwTUV.json?fields=options[code,name]')).options
    for (let event of events) {
        let value = options.find(o => o.name === event[0].substring(0, event[0].length - 1)).code
        await updateEventValue(event[2], 'SaQe2REkGVw', value, event[3])
    }
}

SELECT v2.value AS code, ov.name AS name, e.uid AS eventid, e.storedBy FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v2
INNER JOIN dataelement d2 ON v2.dataelementid = d2.dataelementid AND d2.uid = 'SaQe2REkGVw'
LEFT JOIN optionvalue ov ON d2.optionsetid = ov.optionsetid AND v2.value = ov.code) ON e.programstageinstanceid = v2.programstageinstanceid
WHERE ov.name IS NULL
AND v2.value IS NOT NULL