var jsdom = require('jsdom');

process.browser = true;
global.document = jsdom.jsdom();
global.window = document.parentWindow;
global.navigator = {
	userAgent: 'node.js'
};
