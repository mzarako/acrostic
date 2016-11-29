const router = require('express').Router();
const controller = require('./user.controller');

router.route('/')
	.get(controller.getList)
	.delete(controller.deleteList);

router.route('/:name')
	.post(controller.postLetterList)
	.put(controller.putUpdatedList);

module.exports = router;		
