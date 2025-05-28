const express = require('express');
const router = express.Router();
const { logger, deleteLogFiles } = require('../utils/logger');
const path = require('path');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger-output.json');



const adminAuthentication = async (req, res, next) => {
    if (req.user.role && req.user.role === 'admin') {
        next()
    } else {
        res.status(401).send("Unauthorized")
    }
};


router
    .route("/deletelogs")
    .post(adminAuthentication, async (req, res, next) => {
        try {
            let deletedfiles = deleteLogFiles()
            if (deletedfiles.length > 0)
                res.status(200).send({ message: "Deleted the previous log files", files: deletedfiles })
            else
                res.status(404).send({ message: "No previous log files found to delete", files: deletedfiles })

        } catch (error) {
            logger.error("EXCEPTION", error)
            res.status(500).send("Unable to delete the log files")
        }

    });

router.
    route("/application")
    .get((req, res, next) => {
        filepath = path.join(__dirname, '../../public/html/application.html')
        if (fs.existsSync(filepath)) {
            // res.set('Cache-Control', 'public, max-age=300')
            res.sendFile(filepath)
        }
        else {
            logger.error("ERROR", 'File does not exist in the filesystem ::', filepath)
            res.status(500).send("Internal Server Error")
        }
    })

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs',swaggerUi.setup(swaggerDocument))


router
    .route("*")
    .all((req, res) => {
        res.status(401).send("Unauthorized")
    })



module.exports = router