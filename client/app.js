
$(document).ready(function() {

	var name = "LORENZO";
	var letterList = [];

	$('.custom-poem').on('click', function(e) {
		e.preventDefault();
		// newPoemSetup(name);	
		name = $('input').val();
		$('form').addClass('hidden');
		writeNewPoem(name);
	});

	$('.random-poem').on('click', function(e) {
		e.preventDefault();
		// newPoemSetup(name);
		name = $('input').val();
		$('form').addClass('hidden');
		writeRandomPoem(name);
	});

	$('.new-poem').on('click', function(e) {
		e.preventDefault();
		$('form').removeClass('hidden');
	});

	$('.send-poem').on('click', function(e) {
		e.preventDefault();
		console.log('letterList: ', letterList);
		updateEntirePoem(name);
	});

	$('.adjectives-container').on('submit', '.adjective-container', function(e) {
		e.preventDefault();
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
function updateEntirePoem(name) {
	console.log('updateEntirePoem letterList at start: ', letterList);
	for (var i = 0; i < letterList.length; i++) {
				var id = "#pos-" + i;
				var word = $(id).find('input').val();
				letterList[i].word = word;
			}
	var req = {
		method: 'PUT',
		url: '/user/' + name,
		data: {body: letterList}
	}
	$.ajax(req)
	.done(function(res) {
		letterList = res;
		console.log('updateEntirePoem letterList: ', letterList);
	})	
}

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
