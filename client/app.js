
$(document).ready(function() {

	var name = "gandalf";
	var letterList = [];

	$('.name-form').addClass('hidden');
	newPoemSetup();
	writeRandomPoem(name);


	$('.custom-poem').on('click', function(e) {
		e.preventDefault();
		newPoemSetup();	
		name = $('.name').val();
		$('.name-form').addClass('hidden');
		writeNewPoem(name);
	});

	$('.random-poem').on('click', function(e) {
		e.preventDefault();
		randomPoemSubmit();
	});

	$('.name-form').submit(function(e) {
		e.preventDefault();
		randomPoemSubmit();
	})

	$('.new-poem').on('click', function(e) {
		e.preventDefault();
		$('.name-form').toggleClass('hidden');
	});

	$('.view-dictionary').on('click', function(e) {
		e.preventDefault();
		$('.dictionary-container').toggleClass('hidden').empty().append('<div class="dictionary-form"><div class="dictionary-input"><input class="letter-search" type="text" placeholder="a, b, c..."></div><div class="search-div"><img class="search" src="search.png"></div></div>');
	});
	// $('.send-poem').on('click', function(e) {
	// 	e.preventDefault();
	// 	console.log('MEOW!!: ', letterList);
	// 	updateEntirePoem(name);
	// });

	$('.adjectives-container').on('submit', '.adjective-container', function(e) {
		e.preventDefault();
	});

	$('.dictionary-container').on('click', '.search', function(e) {
		e.preventDefault();
		dictionarySetUp();
	});

	$('.dictionary-container').on('keypress', '.letter-search', function(e) {
        if(e.which == 13){
        	console.log('inside keypress');
            dictionarySetUp();
        }
    });

function randomPoemSubmit() {
	newPoemSetup();
	name = $('.name').val();
	$('.name-form').addClass('hidden');
	writeRandomPoem(name);
}

function dictionarySetUp() {
	console.log('search was clicked');
	var letter = $('.letter-search').val();
	$('.error-letter').remove();
	$('.current-dictionary').remove();
	$('.word-list').remove();
	console.log(testLetterInput(letter));
	if (!testLetterInput(letter)) {
		$('.dictionary-container').append('<p class="error-letter">Please enter a valid letter.</p>');
	}
	else {
		getDictionaryByLetter(letter);
	}
}

function testLetterInput(letter) {
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	for (var i = 0; i < alphabet.length; i++) {
		if (letter == alphabet[i]) return true;
	}
	return false;
}

// gets words to display by searched letter, then appends word list
function getDictionaryByLetter(letter) {
	letter = letter.toUpperCase();
	console.log('letter: ', letter);
	$.ajax({
		method: 'GET',
		url: '/words/' + letter
	}).done(function(res) {
		var currentDictionary = res;
		$('.dictionary-container').append('<div class="current-dictionary"></div>');
		var wordList = currentDictionary.join(',  ');
		$('.current-dictionary').append('<p class="word-list">' + wordList + '</p>');
		console.log(currentDictionary);
	}).fail(function(err) {
		console.log(err);
	});
}

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


// clean up HTML for new poem 
function newPoemSetup() {
	$('.letters-container').empty();
	$('.adjectives-container').empty();
	$.ajax({
		method: 'DELETE',
		url: '/user/'
	}).done(function(res) {
		letterList = res;
		console.log('newPoemSetup letterList: ', letterList);
	}).fail(function(err) {
		console.log(err);
	});
} 

// saves final version of poem for sendoff
// function updateEntirePoem(name) {
// 	console.log('updateEntirePoem letterList at start: ', letterList);
// 	for (var i = 0; i < letterList.length; i++) {
// 				var id = "#pos-" + i;
// 				var word = $(id).val();
// 				letterList[i].word = word;
// 			}
// 	var req = {
// 		method: 'PUT',
// 		url: '/user/' + name,
// 		data: {body: letterList}
// 	}
// 	$.ajax(req)
// 	.done(function(res) {
// 		letterList = res;
// 		console.log('updateEntirePoem letterList: ', letterList);
// 	})	
// }

// creates blank poem
function writeNewPoem(name) {
	name = getInputLetters(name);
	var req = {
		method: 'POST',
		url: '/user/' + name,
		data: {
			'name': name
		}
	}
	$.ajax(req)
	.done(function(res) {
		letterList = res;
		console.log('writeNewPoem letterList: ', letterList);
	})
	.fail(function(err) {
		console.log(err);
	});
}

// creates blank poem, adds random words to poem
function writeRandomPoem(name) {
	name = getInputLetters(name);
	var req = {
		method: 'POST',
		url: '/user/' + name,
		data: {
			'name': name
		}
	}
	$.ajax(req)
	.done(function(res) {
		console.log('after first done res: ', res);
		$.ajax({
		method: 'PUT',
		url: '/words/random/' + name,
		data: {'body': res},
		})
		.done(function(response) {
			letterList = response;
			console.log('writeRandomPoem middle letterList: ', letterList);
			console.log('response: ', response);
			for (var i = 0; i < letterList.length; i++) {
				var updateWord = letterList[i].word;
				var id = "#pos-" + i;
				$(id).val(updateWord);
			}
			console.log('writeRandomPoem inner letterList: ', letterList);
		})
		.fail(function(err) {
			console.log(err);
		});
	})
	.fail(function(err) {
		console.log(err);
	});
}

});
