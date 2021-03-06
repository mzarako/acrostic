let Words = require('./words.resource');

let methods = {};

methods.findWords = () => {
	return Words;
}

methods.findWordsByLetter = (letter) => {
	for (var i = 0; i < Words.length; i++) {
		if (Words[i].letter === letter) {
			return Words[i].words;
		}
	}
}

methods.findRandomWord = (letterArray) => {
	for (var i = 0; i < letterArray.length; i++) {
		var letter = letterArray[i].letter;
		var letteredWords = methods.findWordsByLetter(letter);
		var randomNumber = Math.floor((Math.random() * (letteredWords.length-1)));
		var word = letteredWords[randomNumber];
		word = word.substring(1, word.length);
		letterArray[i].word = word;
	}
	return letterArray;
}

let Controller = {
	getWords: (req, res) => {
		const allWords = methods.findWords();
		res.status(200).json(allWords);
	},
	getWordsByLetter: (req, res) => {
		const wordsByLetter = methods.findWordsByLetter(req.params.letter);
		res.status(200).json(wordsByLetter);
	},
	getRandomWordByLetter: (req, res) => {
		const randomWords = methods.findRandomWord(req.body.body);
		res.status(200).json(randomWords);
	}
};

module.exports = Controller;
