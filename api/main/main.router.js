const router = require('express').Router();
const controller = require('./main.controller');

router.route('/')
	.get(controller.getMain);

module.exports = router;