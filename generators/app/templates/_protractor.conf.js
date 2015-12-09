exports.config = {
    capabilities: {
		'browserName': 'chrome',
		'chromeOptions': {
            args: ['--disable-web-security']
        }
    },
    specs: [
        './test/e2e/**/*.js'
    ],
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
    },
    baseUrl: 'http://localhost:8100/',
    allScriptsTimeout: 20000,
    onPrepare: function(){
        browser.driver.get('http://localhost:3000');
    }
};
