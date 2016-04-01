'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');

describe('generator-ionic-incubator:app', function() {
	before(function(done) {
		helpers.run(path.join(__dirname, '../generators/app'))
			.inDir(path.join(os.tmpdir(), './temp-test'))
			.withPrompts({appName: 'testapp', userName: 'John Doe', userMail: 'mail@example.com'})
			.on('end', done);
	});

	it('copied config files', function() {
		assert.file([
			'bower.json',
			'config.xml',
			'gulpfile.js',
			'package.json',
			'vendor.json'
		]);
	});

	it('copied resource files', function() {
		assert.file([
			'resources/icon.png',
			'resources/splash.png'
		]);
	});

	it('copied js files', function() {
		assert.file([
			'src/scripts/app.js',
			'src/scripts/config/route.js',
			'src/scripts/config/run.js',
			'src/scripts/controllers/homeController.js',
			'src/scripts/controllers/mainController.js',
			'src/scripts/controllers/settingsController.js'
		]);
	});

	it('copied test files', function() {
		assert.file([
			'test/e2e/app.home.spec.js',
			'test/e2e/app.settings.spec.js',
			'test/e2e/sideMenu.spec.js',
			'test/e2e/pageObjects/MainPageObjects.js',
			'test/e2e/pageObjects/SideMenuPageObjects.js',
			'test/unit/app.spec.js',
			'test/unit/homeController.spec.js',
			'test/unit/mainController.spec.js',
			'test/unit/route.spec.js',
			'test/unit/run.spec.js',
			'test/unit/settingsController.spec.js'
		]);
	});

	it('copied html files', function() {
		assert.file([
			'src/index.html',
			'src/templates/main.html',
			'src/templates/views/home.html',
			'src/templates/views/settings.html'
		]);
	});

	it('copied scss files', function() {
		assert.file([
			'src/styles/_variables.scss',
			'src/styles/main.scss',
			'src/styles/layout/layout.scss',
			'src/styles/menu/menu.scss',
			'src/styles/views/home.scss'
		]);
	});

	it('configs contain input values', function() {
		assert.fileContent('config.xml', '<widget id="com.johndoe.testapp" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">');
		assert.fileContent('config.xml', '<name>testapp</name>');
		assert.fileContent('config.xml', '<author email="mail@example.com">');
		assert.fileContent('config.xml', 'John Doe');
		assert.fileContent('gulpfile.js', 'var appName = \'Testapp\';');
	});

	it('js files contain input values', function() {
		assert.fileContent('src/scripts/app.js', 'angular.module(\'Testapp\', [\'ionic\', \'ngCordova\', \'ngResource\']);');
		assert.fileContent('src/scripts/config/route.js', '.module(\'Testapp\')');
		assert.fileContent('src/scripts/config/run.js', '.module(\'Testapp\')');
		assert.fileContent('src/scripts/controllers/homeController.js', '.module(\'Testapp\')');
		assert.fileContent('src/scripts/controllers/mainController.js', '.module(\'Testapp\')');
		assert.fileContent('src/scripts/controllers/settingsController.js', '.module(\'Testapp\')');
	});

	it('test files contain input values', function() {
		assert.fileContent('test/e2e/app.home.spec.js', 'expect(mainPageObject.headerTitle.getText()).toMatch(\'Testapp\');');
		assert.fileContent('test/e2e/app.home.spec.js', 'expect(title.getText()).toMatch(\'Testapp\');');
		assert.fileContent('test/unit/app.spec.js', 'describe(\'Testapp\', function(){');
		assert.fileContent('test/unit/homeController.spec.js', 'module(\'Testapp\');');
		assert.fileContent('test/unit/mainController.spec.js', 'module(\'Testapp\');');
		assert.fileContent('test/unit/route.spec.js', 'module(\'Testapp\');');
		assert.fileContent('test/unit/settingsController.spec.js', 'module(\'Testapp\');');
	});

	it('html files contain input values', function() {
		assert.fileContent('src/index.html', '<title>testapp</title>');
		assert.fileContent('src/index.html', '<body ng-app="Testapp">');
		assert.fileContent('src/templates/views/home.html', '<h1 class="title">testapp</h1>');
	});
});
