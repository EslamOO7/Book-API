const pool = require('./pool');


// promise 

exports.dbQuery = (queryText, queryvalues) => {
    return new Promise((resolve, reject) => {
        pool.query(queryText, queryvalues)
            .then(res => { resolve(res); })
            .catch(err => { reject(err); });
    });
};