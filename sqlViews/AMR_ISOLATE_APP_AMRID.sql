SELECT
    v.value AS amrID,
    tei.uid AS enrollmentUID,
    e.uid AS eventUID,
    e.executiondate::date AS eventDate,
    pr.uid AS programUid,
    o.uid AS orgUID
FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN trackedentityinstance tei on tei.trackedentityinstanceid = pi.trackedentityinstanceid
INNER JOIN (
    trackedentitydatavalue v
    INNER JOIN dataelement d ON v.dataelementid = d.dataelementid
    AND d.uid = 'lIkk661BLpG'
) ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (
    trackedentitydatavalue v2
    INNER JOIN dataelement d2 ON v2.dataelementid = d2.dataelementid
    AND d2.uid = 'nP6QJxLhB2o'
) ON e.programstageinstanceid = v2.programstageinstanceid
WHERE o.uid = '${orgUid}'
AND pr.uid = '${program}' 
AND e.executiondate between '${startdate}' and '${enddate}'
AND v2.value IS NULL