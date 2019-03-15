-- L1 all:
SELECT v.value AS amrid, pr.name AS organismgroup, ov.name AS organism, e.created::date, e.lastupdated::date, o.uid AS ouid, e.uid AS eventid FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v2
INNER JOIN dataelement d2 ON v2.dataelementid = d2.dataelementid AND d2.uid = 'SaQe2REkGVw'
INNER JOIN optionvalue ov ON d2.optionsetid = ov.optionsetid AND v2.value = ov.code) ON e.programstageinstanceid = v2.programstageinstanceid
WHERE o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'
ORDER BY e.lastupdated DESC

-- L1 all count:
SELECT COUNT(v.value) FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
AND e.status = 'COMPLETED'
WHERE o.path LIKE '%${orgunit}%'

-- L1 incomplete:
SELECT v.value AS amrid, pr.name AS organismgroup, ov.name AS organism, e.created::date, e.lastupdated::date, o.uid AS ouid, e.uid AS eventid FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v2
INNER JOIN dataelement d2 ON v2.dataelementid = d2.dataelementid AND d2.uid = 'SaQe2REkGVw'
INNER JOIN optionvalue ov ON d2.optionsetid = ov.optionsetid AND v2.value = ov.code) ON e.programstageinstanceid = v2.programstageinstanceid
WHERE e.storedby = '${username}'
AND o.path LIKE '%${orgunit}%'
AND e.status = 'ACTIVE'
ORDER BY e.lastupdated DESC

-- L1 incomplete count:
SELECT COUNT(v.value) FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
AND e.status = 'ACTIVE'
WHERE o.path LIKE '%${orgunit}%'

-- L1 status:
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
WHERE v3.value = '${status}'
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'
ORDER BY e.lastupdated DESC

-- L1 status count:
SELECT COUNT(v.value) FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
WHERE v3.value = '${status}'
AND e.status = 'COMPLETED'
AND o.path LIKE '%${orgunit}%'

-- L1 validate:
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
WHERE v3.value IS NULL
AND o.path LIKE '%${orgunit}%'
AND e.status = 'COMPLETED'
ORDER BY e.lastupdated DESC

-- L1 validate count:
SELECT COUNT(v.value) FROM programstageinstance e
INNER JOIN programinstance pi ON e.programinstanceid = pi.programinstanceid
INNER JOIN program pr ON pi.programid = pr.programid
INNER JOIN organisationunit o ON e.organisationunitid = o.organisationunitid
INNER JOIN (trackedentitydatavalue v
INNER JOIN dataelement d ON v.dataelementid = d.dataelementid AND d.uid = 'lIkk661BLpG') ON e.programstageinstanceid = v.programstageinstanceid
LEFT JOIN (trackedentitydatavalue v3
INNER JOIN dataelement d3 ON v3.dataelementid = d3.dataelementid AND d3.uid = 'tAyVrNUTVHX') ON e.programstageinstanceid = v3.programstageinstanceid
WHERE v3.value IS NULL
AND e.status = 'COMPLETED'
AND o.path LIKE '%${orgunit}%'

