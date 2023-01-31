const queries = require('../DB/queries');
const DB_Connection = require('../DB/connection');
const util = require('../util/utility');

const Logger = require('../services/logger.ser');
const logger = new Logger('user.Controller');

const audit = require('../Audit/audit.service');
const Action = require('../Audit/auditAction');

const APIError = require('../error/api.error');
const errorStatus = require('../error/error.status');
const errorType = require('../error/error.type');

const validationUtil = require('../util/validation');
var bcrypt = require('bcryptjs');

exports.getUserList = async function (req, res, next) {
    var auditOn = util.dateFormat();
    try {
        const UserListquery = queries.queryList.GET_USER_LIST_QUERY;
        const result = await DB_Connection.dbQuery(UserListquery);
        logger.info('Returning USER list', result.rows);
        audit.prepareAudit(Action.auditAction.GET_USER_LIST, result.rows, null, "Postman", auditOn);
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (err) {
        console.log("Error : " + err);

        let errorMessage = 'Failed to get users list' + err;
        audit.prepareAudit(Action.auditAction.GET_USER_LIST, null, JSON.stringify(errorMessage), "Postman", auditOn);

        return res.status(500).send({ error: "Failed to get USERs list" });
    }
};


exports.createUser = async function (req, res, next) {
    try {
        const createdBy = 'Admin';
        const createdOn = new Date();
        //res.body
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const fullname = req.body.fullname;
        const userTypeCode = req.body.userTypeCode;
        //list roles groups added to the user
        const groups = req.body.groups;


        if (!username || !password || !email || !fullname || !userTypeCode || !groups) {
            return res.status(500).send({ error: "username,password,email,fullname ,userTypeCode and groups  are required,can not be empty!!!" });
        }
        /** 
        *  Validation
        *   1- username or email not exist  
        *   2- is email 
        *   3- validate password strength 
        * */

        const isUserExistsQuery = queries.queryList.IS_USER_EXISTS_QUERY;
        const result = await DB_Connection.dbQuery(isUserExistsQuery, [username, email]);
        console.log("Result : " + JSON.stringify(result));
        if (result.rows[0].count != "0") {
            return res.status(500).send({ error: 'User already Exists' });
        }
        if (!validationUtil.isValidEmail(email)) {
            return res.status(500).send({ error: 'Email is not valid' });
        }
        if (!validationUtil.isValidPassword(password)) {
            return res.status(500).send({ error: 'Password is not valid' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        values = [username, hashedPassword, email, userTypeCode, fullname, createdOn, createdBy];
        const AddUSERQuery = queries.queryList.ADD_USER_QUERY;
        await DB_Connection.dbQuery(AddUSERQuery, values);

        return res.status(200).send('Successfully Added');
    } catch (error) {
        console.log("Error : " + error);
        return res.status(500).send({ error: "Failed to CREATE USER !!!" });
    }

};
