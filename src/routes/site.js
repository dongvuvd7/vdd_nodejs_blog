const express = require('express');
const SiteController = require('../resources/app/controllers/SiteController');
const router = express.Router();

const siteController = require('../resources/app/controllers/SiteController')


router.use('/search', SiteController.search)
router.use('/', siteController.index)



module.exports = router;