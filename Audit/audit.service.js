const events = require("events");
const audit = require("../model/Audit.model");
const emitter = new events.EventEmitter();

const queries = require('../DB/queries');
const DB_Connection = require('../DB/connection');
const auditEvent = 'audit';

emitter.on(auditEvent, function (audit) {
    // steps of actions - save into DB
    console.log("Audit Event Emitter - Audit : " + JSON.stringify(audit));
    try {
        values = [audit.auditAction, JSON.stringify(audit.data), audit.status, audit.error, audit.auditBy, audit.auditOn];
        var auditQuery = queries.queryList.AUDIT_QUERY;
        DB_Connection.dbQuery(auditQuery, values);

    } catch (error) {
        console.log("Audit Event Emitter - error : " + error);
    }
});


exports.prepareAudit = (auditAction, data, error, auditBy, auditOn) => {

    let status = 200;
    if (error) {
        status = 500;
    }
    var auditObj = new audit.Audit(auditAction, data, status, error, auditBy, auditOn);
    emitter.emit(auditEvent, auditObj);

};


