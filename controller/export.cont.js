const queries = require('../DB/queries');
const dbConnection = require('../DB/connection');
const util = require('../util/utility');
const validationUtil = require('../util/validation');
const Logger = require('../services/logger.ser');
const multer = require('multer');

const fastCsv = require('fast-csv');
const fs = require('fs');
const ws = fs.createWriteStream("books.csv");

const logger = new Logger('export.controller');


exports.exportBooks = async (req, res) => {
    try {
        const bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
        const result = await dbConnection.dbQuery(bookListQuery);
        logger.info("return Book List", result.rows);
        const data = JSON.parse(JSON.stringify(result.rows));
        fastCsv.write(data, { headers: true }).on("end", () => {
            console.log("write to books.csv successfully");
            res.download("books.csv", function () {
                console.log("file downloaded successfully");
            });
            
        }).pipe(ws);
        // return res.status(200).send({data : "export data successfully"})
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({ error: 'Failed to export books' });
    }
};