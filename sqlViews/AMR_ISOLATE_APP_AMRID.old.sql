select tedv.value AS amrID, pi.uid AS enrollmentUID, psi.uid AS eventUID, psi.executiondate::date AS eventDate, prg.uid AS programUid, tei.uid AS teiUID, org.uid AS orgUID 
from trackedentitydatavalue tedv
INNER JOIN programstageinstance psi on psi.programstageinstanceid = tedv.programstageinstanceid
INNER JOIN programinstance pi on pi.programinstanceid = psi.programinstanceid
INNER JOIN program prg on prg.programid = pi.programid
INNER JOIN trackedentityinstance tei on tei.trackedentityinstanceid = pi.trackedentityinstanceid
INNER JOIN organisationunit org on org.organisationunitid = psi.organisationunitid
INNER JOIN dataelement de on de.dataelementid = tedv.dataelementid
where de.uid = 'lIkk661BLpG' and org.uid = '${orgUid}' and prg.uid = '${program}' 
and psi.executiondate between '${startdate}' and '${enddate}'

and tedv.programstageinstanceid in (

select tedv1.programstageinstanceid from trackedentitydatavalue tedv1 
INNER JOIN programstageinstance psi1 on psi1.programstageinstanceid = tedv1.programstageinstanceid
INNER JOIN programinstance pi1 on pi1.programinstanceid = psi1.programinstanceid
INNER JOIN program prg1 on prg1.programid = pi1.programid
INNER JOIN organisationunit org1 on org1.organisationunitid = psi1.organisationunitid
INNER JOIN dataelement de1 on de1.dataelementid = tedv1.dataelementid
where psi1.programstageid = 7283 and de1.uid = 'nP6QJxLhB2o' and org1.uid = '${orgUid}' and prg1.uid = '${program}' 
and psi1.executiondate between '${startdate}' and '${enddate}' and tedv1.value != 'Isolate'
);