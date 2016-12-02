var letterList = [];

let methods = {};

methods.sendList = () => {
	return letterList;
}

methods.createLetterList = (name) => {
	var splitName = name.split("");
	for (var i = 0; i < splitName.length; i++) {
		letterList[i] = {};
		letterList[i].letter = splitName[i];
		letterList[i].word = ""; 
		letterList[i].position = i;
	}
	return letterList;
};

methods.updateWords = (letterArray) => {
	for (var i = 0; i < letterList.length; i++) {
		if (letterList[i].position == letterArray[i].position) {
			letterList[i].word = letterArray[i].word;
		}
	}
	console.log('in updateWords, letterList: ', letterList);
	console.log('in updateWords, letterArray: ', letterArray);
	return letterList;
}

methods.deleteLetterList = () => {
	letterList = [];
	return letterList;
}


let Controller = {
	getList: (req, res) => {
		const list = methods.sendList();
		res.status(200).json(list);
	},
	postLetterList: (req, res) => {
		const listWithName = methods.createLetterList(req.params.name);
		console.log('list with name: ', listWithName);
		res.status(200).json(listWithName);
	},
	putUpdatedList: (req, res) => {
		console.log('putUpdatedList req.body.body: ', req.body.body);
		const updatedList = methods.updateWords(req.body.body);
		res.status(200).json(updatedList);
	},
	deleteList: (req, res) => {
		const emptyList = methods.deleteLetterList();
		res.status(200).json(emptyList);
	}
};

module.exports = Controller;