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

methods.findRandomWord = (letter) => {
	var letteredWords = methods.findWordsByLetter(letter);
	var randomNumber = Math.floor((Math.random() * (letteredWords.length-1)))
	var word = letteredWords[randomNumber];
	word = word.substring(1, word.length);
	return word;
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
		const randomWord = methods.findRandomWord(req.params.letter);
		res.status(200).json(randomWord);
	}
};

module.exports = Controller;