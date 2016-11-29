const express = require('express');

const app = express();

const path = require('path');

const config = require('./config/config.express.js');

const middleware_configuration = require('./config/middleware.express.js');

const mainRouter = require('./api/main/main.router');

const userRouter = require('./api/user/user.router');

const wordsRouter = require('./api/words/words.router');

middleware_configuration(app);

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/words', wordsRouter);

app.get('*', function(req, res){
	res.sendFile(path.resolve(__dirname, './client/index.html'));
});

app.listen(config.express_port, () => {
	console.log(`Express server listening on ${config.express_port}`);
});