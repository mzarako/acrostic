const router = require('express').Router();
const controller = require('./words.controller');

router.route('/')
	.get(controller.getWords);

router.route('/:letter')
	.get(controller.getWordsByLetter);

router.route('/random/:letter')
	.get(controller.getRandomWordByLetter);	

module.exports = router;		


