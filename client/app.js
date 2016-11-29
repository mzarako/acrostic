$(document).ready(function() {

	var name = "LORENZO";
	// function which runs with the name Lorenzo
	// sets off pop-up form (new)

	$('.custom-poem').on('click', function(e) {
		e.preventDefault();
		name = $('input').val();
		$('form').addClass('hidden');
		writeCustomPoem(name);
	});

	$('.adjectives-container').on('submit', '.adjective-container', function(e) {
		e.preventDefault();
		var id = $(this).find('input').attr('id');
		var word = $(this).find('input').val();
		updateWord(name, id, word);
	});

});


// appends letters in name to html
function getInputLetters(name) {
	name = name.toUpperCase();
	for (var i = 0; i < name.length; i++) {
		var letter = name.charAt(i);
		$('.letters-container').append('<div class="letter">' + letter + '</div>');
		$('.adjectives-container').append('<form class="adjective-container"> <input id="pos-' + i + '" type="text"><input type="submit" style="position: absolute; left: -9999px; width: 1px; height: 1px;" tabindex="-1"/> </form>');
	}
	return name;
}


////////////////////////////////////////////////////////////////////////////

// * User Customization * // 

////////////////////////////////////////////////////////////////////////////


// creates blank poem
function writeCustomPoem(name) {
	var name = getInputLetters(name);
	var req = {
		method: 'POST',
		url: '/user/' + name,
		body: {
			'name': name
		}
	}
	var ajax = $.ajax(req);
}


// updates word with user input
function updateWord(name, id, word) {
	id = id.charAt(4);
	var req = {
		method: 'PUT',
		url: '/user/' + name,
		data: {
			'position': id,
			'word': word
		}
	}
	var ajax = $.ajax(req);
}

// function getDictionary(letter) {

// 	var dictionary = {
// 		A: ['A-OK', 'accomplished', 'ace', 'adorable', 'admirable', 'adored', 'adventurous', 'ageless', 'agreeable', 'all heart', 'alluring', 'altruistic', 'amazing', 'ambitious', 'amiable', 'amicable', 'appreciated', 'amusing', 'angelic', 'aphrodisiacal', 'appealing', 'ardent', 'articulate', 'artistic', 'assertive', 'assured', 'astonishing', 'astute', 'athletic', 'attentive', 'attractive', 'atypical', 'aware', 'awesome'],
// 		B: ['balanced', 'beaming', 'beautiful', 'bedazzling', 'beloved', 'benevolent', 'best', 'beyond compare', 'blessed', 'blissful', 'bodacious', 'boisterous', 'bold', 'brainy', 'brave', 'brawny', 'breathtaking', 'bright', 'brilliant', 'brotherly', 'buff'],
// 		C: ['calm', 'capable', 'captivating', 'carefree', 'careful', 'caring', 'celebrated', 'champion', 'charismatic', 'charming', 'cheerful', 'cherished', 'chic', 'chief', 'clairvoyant', 'classic', 'clear-eyed', 'clearheaded', 'clever', 'comforting', 'comic', 'communicative', 'compassionate', 'complete', 'composed', 'conscientious', 'considerate', 'contemplative', 'content', 'cool', 'cooperative', 'coordinated', 'cordial', 'cosmic', 'courageous', 'courteous', 'creative', 'cuddly', 'curious', 'cute']
// 	}

// 	var wordsByLetter = dictionary[letter];
// 	return wordsByLetter;
// }

// function getRandomWord(letter) {
// 	var wordsByLetter = getDictionary(letter);
// 	var randomNumber = Math.floor((Math.random() * (wordsByLetter.length-1)))
// 	var newWord = wordsByLetter[randomNumber];
// 	newWord = newWord.substring(1, newWord.length);
// 	return newWord;
// }


////////////////////////////////////////////////////////////////////////////

// * Dictionary Randomization * // 

////////////////////////////////////////////////////////////////////////////



