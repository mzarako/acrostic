
$(document).ready(function() {

	var name = "LORENZO";
	var letterList = [];

	$('.custom-poem').on('click', function(e) {
		e.preventDefault();
		newPoemSetup(name);	
		name = $('.name').val();
		$('form').addClass('hidden');
		writeNewPoem(name);
	});

	$('.random-poem').on('click', function(e) {
		e.preventDefault();
		newPoemSetup(name);
		name = $('.name').val();
		$('form').addClass('hidden');
		writeRandomPoem(name);
	});

	$('.new-poem').on('click', function(e) {
		e.preventDefault();
		$('.name-form').removeClass('hidden');
	});

	$('.view-dictionary').on('click', function(e) {
		e.preventDefault();
		$('.dictionary-container').toggleClass('hidden').empty().append('<form class="search"><input class="letter-search" type="text" value="a, b, c..."><input type="submit" value="search"></form>');
	});
	// $('.send-poem').on('click', function(e) {
	// 	e.preventDefault();
	// 	console.log('MEOW!!: ', letterList);
	// 	updateEntirePoem(name);
	// });

	$('.adjectives-container').on('submit', '.adjective-container', function(e) {
		e.preventDefault();
	});

	$('.dictionary-container').on('submit', '.search', function(e) {
		e.preventDefault();
		console.log('search was clicked');
		var letter = $('.letter-search').val();
		$('.dictionary-container').empty();
		getDictionaryByLetter(letter);
	});

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
function newPoemSetup(name) {
	$('.letters-container').empty();
	$('.adjectives-container').empty();
	$.ajax({
		method: 'DELETE',
		url: '/user/'
	}).done(function(res) {
		letterList = res;
		console.log('newPoemSetup letterList: ', letterList);
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
