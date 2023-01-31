const queries = require('../DB/queries');
const DB_Connection = require('../DB/connection');
const util = require('../util/utility');

const Logger = require('../services/logger.ser');

const logger = new Logger('Store.Controller');



exports.getStoreList = async function (req, res, next) {
    try {
        const StoreListquery = queries.queryList.GET_STORE_LIST_QUERY;
        const result = await DB_Connection.dbQuery(StoreListquery);
        logger.info('Returning STORE list',  result.rows);
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({ error: "Failed to get store list" });
    }
};

exports.createStore = async (req, res, next) => {
    try {
        const createdBy = 'Admin';
        const createdOn = new Date();
        //res.body
        const storeName = req.body.storeName;
        const address = req.body.address;
        if (!storeName || !address) {
            return res.status(500).send({ error: "STORE name & address are required,can not be empty!!!" });
        }
        let StoreCode = util.generateStoreCode();
        values = [storeName, StoreCode, address, createdBy, createdOn];
        const CreateStoreQuery = queries.queryList.CREATE_STORE;
        await DB_Connection.dbQuery(CreateStoreQuery,values);

        return res.status(200).send('Successfully created');
    } catch (error) {
        console.log("Error : " + error);
        return res.status(500).send({ error: "Failed to create store !!!" });
    }

};