let Controller = {
	getMain: (req, res) => {
		res.json({
			message: 'Welcome to API version 0.1'
		});
	}
};

module.exports = Controller;
