SELECT v.value AS amrid FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (
    trackedentitydatavalue v
    INNER JOIN dataelement d ON v.dataelementid = d.dataelementid
    AND d.uid = 'lIkk661BLpG'
) ON e.programstageinstanceid = v.programstageinstanceid
WHERE o.path LIKE '%${orgunit}%'
ORDER BY v.value