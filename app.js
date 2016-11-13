$(document).ready(function() {

	$('form').submit(function(e) {
		e.preventDefault();
		console.log('i am inside');
		var name = $('input').val();
		name = name.toUpperCase();
		$('form').addClass('hidden');
		getInputLetters(name);
	});

});

function getDictionary(letter) {

	var dictionary = {
		A: ['A-OK', 'accomplished', 'ace', 'adorable', 'admirable', 'adored', 'adventurous', 'ageless', 'agreeable', 'all heart', 'alluring', 'altruistic', 'amazing', 'ambitious', 'amiable', 'amicable', 'appreciated', 'amusing', 'angelic', 'aphrodisiacal', 'appealing', 'ardent', 'articulate', 'artistic', 'assertive', 'assured', 'astonishing', 'astute', 'athletic', 'attentive', 'attractive', 'atypical', 'aware', 'awesome'],
		B: ['balanced', 'beaming', 'beautiful', 'bedazzling', 'beloved', 'benevolent', 'best', 'beyond compare', 'blessed', 'blissful', 'bodacious', 'boisterous', 'bold', 'brainy', 'brave', 'brawny', 'breathtaking', 'bright', 'brilliant', 'brotherly', 'buff'],
		C: ['calm', 'capable', 'captivating', 'carefree', 'careful', 'caring', 'celebrated', 'champion', 'charismatic', 'charming', 'cheerful', 'cherished', 'chic', 'chief', 'clairvoyant', 'classic', 'clear-eyed', 'clearheaded', 'clever', 'comforting', 'comic', 'communicative', 'compassionate', 'complete', 'composed', 'conscientious', 'considerate', 'contemplative', 'content', 'cool', 'cooperative', 'coordinated', 'cordial', 'cosmic', 'courageous', 'courteous', 'creative', 'cuddly', 'curious', 'cute']
	}

	var wordsByLetter = dictionary[letter];
	return wordsByLetter;
}

function getRandomWord(letter) {
	var wordsByLetter = getDictionary(letter);
	var randomNumber = Math.floor((Math.random() * (wordsByLetter.length-1)))
	var newWord = wordsByLetter[randomNumber];
	newWord = newWord.substring(1, newWord.length);
	return newWord;
}

function getInputLetters(name) {
	for (var i = 0; i < name.length; i++) {
		var letter = name.charAt(i);
		$('.letters-container').append('<div class="letter">' + letter + '</div>');
		var newWord = getRandomWord(letter);
		$('.adjectives-container').append('<div class="adjective">' + newWord + '</div>');
	}
}
