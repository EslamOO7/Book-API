const util = require('../util/utility');
const validationUtil = require('../util/validation');
const Logger = require('../services/logger.ser');
const multer = require('multer');
const logger = new Logger('upload.controller');
const dotenv = require('dotenv');

dotenv.config();

exports.uploadFile = async (req, res, next) => {
    const date = util.dateFormat();
    try {
        var upload = multer({ dest: process.env.UPLOAD_PATH }).single('photo');
        upload(req, res, next => {

            try {
                var path = req.file.path;
                var file = req.file;
                console.log("Path : " + path);
                console.log("file : " + JSON.stringify(file));
                // save file in directory 
                // save meta dat in data base [file name (rename) , size , mimiType , path]
                return res.status(200).send({ data: 'file is uploaded Successfully ' });
            } catch (e) {
                throw e;
            }

        });

    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({ error: 'Failed to upload file' });
    }
};




// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString().replace(/:/g, '-') + '--' + file.originalname);
//     }
// });
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//         cb(null, true);
//     } else {
//         cb(null, false)
//     }
// }
// app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"))

