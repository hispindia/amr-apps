-- L2 all:
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
WHERE v3.value = 'Approved'
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'
ORDER BY e.lastupdated DESC

-- L2 all count:
SELECT COUNT(v.value) FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
WHERE v3.value = 'Approved'
AND e.status = 'COMPLETED'
AND o.path LIKE '%${orgunit}%'

-- L2 incomplete:
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
WHERE v3.value = 'Approved'
AND o.path LIKE '%${orgunit}%'
AND e.status = 'ACTIVE'
ORDER BY e.lastupdated DESC

-- L2 incomplete count:
SELECT COUNT(v.value) FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
WHERE v3.value = 'Approved'
AND e.status = 'ACTIVE'
AND o.path LIKE '%${orgunit}%'

-- L2 status:
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
WHERE v3.value = 'Approved'
AND v4.value = '${status}'
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'
ORDER BY e.lastupdated DESC

-- L2 status count:
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
WHERE v3.value = 'Approved'
AND v4.value = '${status}'
AND e.status = 'COMPLETED'
AND o.path LIKE '%${orgunit}%'

-- L2 validate:
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
WHERE v3.value = 'Approved'
AND v4.value IS NULL
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'
ORDER BY e.lastupdated DESC

-- L2 validate count:
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
WHERE v3.value = 'Approved'
AND v4.value IS NULL
AND e.status = 'COMPLETED'
AND o.path LIKE '%${orgunit}%'

