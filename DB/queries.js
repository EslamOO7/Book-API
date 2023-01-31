exports.queryList = {
    GET_STORE_LIST_QUERY: 'SELECT STOREID, STORE_NAME, STORE_CODE FROM "BMS".STORE',
    CREATE_STORE: 'INSERT INTO "BMS".STORE (STORE_NAME, STORE_CODE, ADDRESS , CREATED_BY , CREATED_ON) VALUES($1, $2, $3, $4, $5)',

    GET_BOOK_LIST_QUERY: 'SELECT BOOKID, BOOK_TITLE, BOOK_DESCRIPTION, BOOK_AUTHOR, BOOK_PUBLISHER FROM "BMS".BOOK',
    GET_BOOK_DETAILS_QUERY: `SELECT BOOKID, BOOK_TITLE, BOOK_DESCRIPTION, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_PAGES, BOOK.STORE_CODE ,STORE.STORE_NAME ,STORE.ADDRESS  
                            FROM "BMS".BOOK 
                            INNER JOIN "BMS".STORE ON BOOK.STORE_CODE = STORE.STORE_CODE 
                            WHERE BOOKID = $1`,
    ADD_BOOK_QUERY: ` INSERT INTO "BMS".BOOK (BOOK_TITLE, BOOK_DESCRIPTION, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_PAGES, STORE_CODE, CREATED_BY , CREATED_ON)
                            VALUES($1, $2, $3, $4, $5 , $6 , $7 , $8) `,
    UPDATE_BOOK_QUERY: `UPDATE "BMS".BOOK SET BOOK_TITLE=$1, BOOK_DESCRIPTION=$2, BOOK_AUTHOR=$3, BOOK_PUBLISHER=$4, 
                        BOOK_PAGES=$5, STORE_CODE=$6, CREATED_BY=$7 , CREATED_ON=$8
                        WHERE BOOK_ID=$9`,
    DELETE_BOOK_QUERY: ` DELETE FROM "BMS".BOOK WHERE BOOK_ID=$1 `,

    AUDIT_QUERY: `INSERT INTO "BMS".APP_AUDIT (AUDIT_ACTION, AUDIT_DATA, AUDIT_STATUS, AUDIT_ERROR , AUDIT_BY, AUDIT_ON) VALUES($1, $2, $3, $4, $5, $6)
    `,
    GET_USER_LIST_QUERY: `SELECT USER_ID, USERNAME, EMAIL, USER_TYPE_CODE, FULL_NAME, ACTIVE FROM "BMS".APP_USER;`,

    IS_USER_EXISTS_QUERY: `SELECT COUNT(USER_ID)  FROM "BMS".APP_USER WHERE LOWER(USERNAME) =LOWER($1) OR LOWER(EMAIL)=LOWER($2)`,

    ADD_USER_QUERY: `INSERT INTO "BMS".APP_USER (USERNAME, PASSWORD, EMAIL, USER_TYPE_CODE, FULL_NAME, CREATED_ON, CREATED_BY) 
                    VALUES($1, $2, $3, $4, $5, $6, $7) returning * `,

    LOGIN_QUERY: `SELECT USER_ID, USERNAME, PASSWORD, EMAIL, USER_TYPE_CODE, FULL_NAME, ACTIVE FROM "BMS".APP_USER WHERE LOWER(USERNAME) = LOWER($1) AND ACTIVE = 1  `,



};