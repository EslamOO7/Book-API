const queries = require('../DB/queries');
const DB_Connection = require('../DB/connection');
const util = require('../util/utility');

const Logger = require('../services/logger.ser');
const logger = new Logger('book.Controller');

const audit = require('../Audit/audit.service');
const Action = require('../Audit/auditAction');

const APIError = require('../error/api.error');
const errorStatus = require('../error/error.status');
const errorType = require('../error/error.type');





exports.getBookList = async function (req, res, next) {
    var auditOn = util.dateFormat();
    try {
        const BookListquery = queries.queryList.GET_BOOK_LIST_QUERY;
        const result = await DB_Connection.dbQuery(BookListquery);
        logger.info('Returning book list', result.rows);
        audit.prepareAudit(Action.auditAction.GET_BOOK_LIST, result.rows, null, "Postman", auditOn);
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (err) {
        console.log("Error : " + err);

        let errorMessage = 'Failed to get books list' + err;
        audit.prepareAudit(Action.auditAction.GET_BOOK_LIST, null, JSON.stringify(errorMessage), "Postman", auditOn);

        return res.status(500).send({ error: "Failed to get books list" });
    }
};


exports.getBookDetails = async function (req, res, next) {
    try {
        const bookId = req.params.bookId;
        if (isNaN(bookId)) {
            throw new APIError(errorType.API_ERROR, errorStatus.INTERNAL_SERVER_ERROR, "Invalid BookID, must be a number", true);
        }
        const BookDetailsquery = queries.queryList.GET_BOOK_DETAILS_QUERY;
        const result = await DB_Connection.dbQuery(BookDetailsquery, [bookId]);
        return res.status(200).send(JSON.stringify(result.rows[0]));
    } catch (err) {
        console.log("Error : " + err);
        if (err.name==errorType.SQL_INJECTION_ERROR) {
            //handler Error();
        }
        logger.error("Failed to get Book Details : " + JSON.stringify(err));
        return res.status(500).send({ error: "Failed to get books details!!" });
    }
};

exports.addBook = async function (req, res, next) {
    try {
        const createdBy = 'Admin';
        const createdOn = new Date();
        //res.body
        const title = req.body.title;
        const description = req.body.description;
        const author = req.body.author;
        const publisher = req.body.publisher;
        const pages = req.body.pages;
        const storeCode = req.body.storeCode;
        if (!title || !description || !publisher || !storeCode) {
            return res.status(500).send({ error: "bookName, description & publisher are required,can not be empty!!!" });
        }
        values = [title, description, author, publisher, pages, storeCode, createdBy, createdOn];
        const AddBookQuery = queries.queryList.ADD_BOOK_QUERY;
        await DB_Connection.dbQuery(AddBookQuery, values);

        return res.status(200).send('Successfully Added');
    } catch (error) {
        console.log("Error : " + error);
        return res.status(500).send({ error: "Failed to ADD Book !!!" });
    }

};


exports.updateBook = async function (req, res, next) {
    try {
        const createdBy = 'Admin';
        const createdOn = new Date();
        //res.body
        const bookId = req.body.bookId;
        const title = req.body.title;
        const description = req.body.description;
        const author = req.body.author;
        const publisher = req.body.publisher;
        const pages = req.body.pages;
        const storeCode = req.body.storeCode;
        if (!title || !description || !publisher || !storeCode || !bookId) {
            return res.status(500).send({ error: "Id,bookName, description & publisher are required,can not be empty!!!" });
        }
        values = [title, description, author, publisher, pages, storeCode, createdBy, createdOn, bookId];
        const UpdateBookQuery = queries.queryList.UPDATE_BOOK_QUERY;
        await DB_Connection.dbQuery(UpdateBookQuery, values);

        return res.status(200).send('Successfully update book');
    } catch (error) {
        console.log("Error : " + error);
        return res.status(500).send({ error: "Failed to ADD Book !!!" });
    }

};
exports.deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        if (!bookId) {
            return res.status(500).send({ error: "BookID is required" });
        }
        const DeleteBookQuery = queries.queryList.DELETE_BOOK_QUERY;
        await DB_Connection.dbQuery(DeleteBookQuery, [bookId]);
        return res.status(200).send("Successfully delete book");
    } catch (error) {
        console.log("Error : " + error);
        return res.status(500).send({ error: "Failed deleteing Book" });
    }
};


