-- DEO all:
SELECT v.value AS amrid, pr.name AS organismgroup, ov.name AS organism, e.created::date, e.lastupdated::date, o.uid AS ouid, e.uid AS eventid FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v2
INNER JOIN dataelement d2 ON v2.dataelementid = d2.dataelementid AND d2.uid = 'SaQe2REkGVw'
INNER JOIN optionvalue ov ON d2.optionsetid = ov.optionsetid AND v2.value = ov.code) ON e.programstageinstanceid = v2.programstageinstanceid
WHERE v.storedby = '${username}'
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'
ORDER BY e.lastupdated DESC

-- DEO all count:
SELECT COUNT(v.value) FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
WHERE v.storedby = '${username}'
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'

-- DEO approved:
SELECT v.value AS amrid, pr.name AS organismgroup, ov.name AS organism, e.created::date, e.lastupdated::date, o.uid AS ouid, e.uid AS eventid FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v2
INNER JOIN dataelement d2 ON v2.dataelementid = d2.dataelementid AND d2.uid = 'SaQe2REkGVw'
INNER JOIN optionvalue ov ON d2.optionsetid = ov.optionsetid AND v2.value = ov.code) ON e.programstageinstanceid = v2.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v4
INNER JOIN dataelement d4 ON v4.dataelementid = d4.dataelementid AND d4.uid = 'sXDQT6Yaf77') ON e.programstageinstanceid = v4.programstageinstanceid
WHERE v.storedby = '${username}'
AND v3.value = 'Approved'
AND v4.value = 'Approved'
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'
ORDER BY e.lastupdated DESC

-- DEO approved count:
SELECT COUNT(v.value) FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v4
INNER JOIN dataelement d4 ON v4.dataelementid = d4.dataelementid AND d4.uid = 'sXDQT6Yaf77') ON e.programstageinstanceid = v4.programstageinstanceid
WHERE v.storedby = '${username}'
AND v3.value = 'Approved'
AND v4.value = 'Approved'
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'

-- DEO incomplete:
SELECT v.value AS amrid, pr.name AS organismgroup, ov.name AS organism, e.created::date, e.lastupdated::date, o.uid AS ouid, e.uid AS eventid FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v2
INNER JOIN dataelement d2 ON v2.dataelementid = d2.dataelementid AND d2.uid = 'SaQe2REkGVw'
INNER JOIN optionvalue ov ON d2.optionsetid = ov.optionsetid AND v2.value = ov.code) ON e.programstageinstanceid = v2.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v4
INNER JOIN dataelement d4 ON v4.dataelementid = d4.dataelementid AND d4.uid = 'sXDQT6Yaf77') ON e.programstageinstanceid = v4.programstageinstanceid
WHERE v.storedby = '${username}'
AND o.path LIKE '%${orgunit}%'
AND e.status = 'ACTIVE'
AND ((v3.value IS NULL OR v3.value = 'Resend') AND (v4.value IS NULL OR v4.value = 'Resend'))
ORDER BY e.lastupdated DESC

-- DEO incomplete count:
SELECT COUNT(v.value) FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v4
INNER JOIN dataelement d4 ON v4.dataelementid = d4.dataelementid AND d4.uid = 'sXDQT6Yaf77') ON e.programstageinstanceid = v4.programstageinstanceid
WHERE v.storedby = '${username}'
AND o.path LIKE '%${orgunit}%'
AND e.status = 'ACTIVE'
AND ((v3.value IS NULL OR v3.value = 'Resend') AND (v4.value IS NULL OR v4.value = 'Resend'))

-- DEO rejected:
SELECT v.value AS amrid, pr.name AS organismgroup, ov.name AS organism, e.created::date, e.lastupdated::date, o.uid AS ouid, e.uid AS eventid FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v2
INNER JOIN dataelement d2 ON v2.dataelementid = d2.dataelementid AND d2.uid = 'SaQe2REkGVw'
INNER JOIN optionvalue ov ON d2.optionsetid = ov.optionsetid AND v2.value = ov.code) ON e.programstageinstanceid = v2.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v4
INNER JOIN dataelement d4 ON v4.dataelementid = d4.dataelementid AND d4.uid = 'sXDQT6Yaf77') ON e.programstageinstanceid = v4.programstageinstanceid
WHERE v.storedby = '${username}'
AND (v3.value = 'Rejected' OR v4.value = 'Rejected')
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'
ORDER BY e.lastupdated DESC

-- DEO rejected count:
SELECT COUNT(v.value) FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v4
INNER JOIN dataelement d4 ON v4.dataelementid = d4.dataelementid AND d4.uid = 'sXDQT6Yaf77') ON e.programstageinstanceid = v4.programstageinstanceid
WHERE v.storedby = '${username}'
AND (v3.value = 'Rejected' OR v4.value = 'Rejected')
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'

-- DEO resend:
SELECT v.value AS amrid, pr.name AS organismgroup, ov.name AS organism, e.created::date, e.lastupdated::date, o.uid AS ouid, e.uid AS eventid FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v2
INNER JOIN dataelement d2 ON v2.dataelementid = d2.dataelementid AND d2.uid = 'SaQe2REkGVw'
INNER JOIN optionvalue ov ON d2.optionsetid = ov.optionsetid AND v2.value = ov.code) ON e.programstageinstanceid = v2.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v4
INNER JOIN dataelement d4 ON v4.dataelementid = d4.dataelementid AND d4.uid = 'sXDQT6Yaf77') ON e.programstageinstanceid = v4.programstageinstanceid
WHERE v.storedby = '${username}'
AND (v3.value = 'Resend' OR v4.value = 'Resend')
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'
ORDER BY e.lastupdated DESC

-- DEO resend count:
SELECT COUNT(v.value) FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v4
INNER JOIN dataelement d4 ON v4.dataelementid = d4.dataelementid AND d4.uid = 'sXDQT6Yaf77') ON e.programstageinstanceid = v4.programstageinstanceid
WHERE v.storedby = '${username}'
AND (v3.value = 'Resend' OR v4.value = 'Resend')
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'

-- DEO validate:
SELECT v.value AS amrid, pr.name AS organismgroup, ov.name AS organism, e.created::date, e.lastupdated::date, o.uid AS ouid, e.uid AS eventid FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v2
INNER JOIN dataelement d2 ON v2.dataelementid = d2.dataelementid AND d2.uid = 'SaQe2REkGVw'
INNER JOIN optionvalue ov ON d2.optionsetid = ov.optionsetid AND v2.value = ov.code) ON e.programstageinstanceid = v2.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v4
INNER JOIN dataelement d4 ON v4.dataelementid = d4.dataelementid AND d4.uid = 'sXDQT6Yaf77') ON e.programstageinstanceid = v4.programstageinstanceid
WHERE v.storedby = '${username}'
AND ((v3.value IS NULL AND v4.value IS NULL) OR (v3.value = 'Approved' AND v4.value IS NULL))
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'
ORDER BY e.lastupdated DESC

-- DEO validate count:
SELECT COUNT(v.value) FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v4
INNER JOIN dataelement d4 ON v4.dataelementid = d4.dataelementid AND d4.uid = 'sXDQT6Yaf77') ON e.programstageinstanceid = v4.programstageinstanceid
WHERE v.storedby = '${username}'
AND ((v3.value IS NULL AND v4.value IS NULL) OR (v3.value = 'Approved' AND v4.value IS NULL))
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'

