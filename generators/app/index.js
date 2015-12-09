/* globals require, module */
'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore.string');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the sublime ' + chalk.red('generator-ionic-incubator') + ' generator!'
		));

		var prompts = [{
	        type: 'input',
	        name: 'appName',
	        message: 'What is the app going to be called?',
	        default : this.appname
	    },
	    {
			type: 'input',
			name: 'userName',
			message: 'The author\'s name? (for config files)',
			default : this.user.git.name || 'Your Name'
		},
		{
			type: 'input',
			name: 'userMail',
			message: 'Author email? (for config files)',
			default : this.user.git.email || 'email@example.com'
		}];

		this.prompt(prompts, function (props) {
			this.appName = props.appName;
	        this.userName = props.userName;
	        this.userMail = props.userMail;
			done();
		}.bind(this));
	},

	askForAppId: function() {
		var done = this.async();
		this.prompt([{
			type: 'input',
			name: 'appId',
			message: 'What do you want the app id to be?',
			default : 'com.' + _.classify(this.userName).toLowerCase() + '.' + _.classify(this.appName).toLowerCase()
		}], function (props) {
			this.appId = props.appId;
			done();
		}.bind(this));
	},

	writing: {
		setup: function() {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				{
					appName: _.underscored(this.appName),
					userName: this.userName,
					userEmail: this.userMail
				}
			);
			this.fs.copyTpl(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json'),
				{
					appName: _.classify(this.appName),
					userName: this.userName,
					userEmail: this.userMail
				}
			);
			this.fs.copyTpl(
				this.templatePath('_config.xml'),
				this.destinationPath('config.xml'),
				{
					appName: this.appName,
					userName: this.userName,
					userEmail: this.userMail,
					widgetId: this.appId
				}
			);
			this.fs.copyTpl(
				this.templatePath('_gulpfile.js'),
				this.destinationPath('gulpfile.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);
			this.fs.copy(
				this.templatePath('editorconfig'),
				this.destinationPath('.editorconfig')
			);
			this.fs.copy(
				this.templatePath('gitignore'),
				this.destinationPath('.gitignore')
			);
			this.fs.copy(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc')
			);
			mkdirp('www');
		},

		projectfiles: function () {
			this.directory('src', 'src');
			mkdirp('src/images');
			mkdirp('src/fonts');
			mkdirp('resources');
			mkdirp('src/scripts');
			mkdirp('src/scripts/controllers');
			mkdirp('src/scripts/config');
			mkdirp('test');
			mkdirp('test/unit');
			mkdirp('test/e2e');
			mkdirp('test/e2e/pageObjects');

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('src/index.html'),
				{
					title: this.appName, ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copyTpl(
				this.templatePath('home.html'),
				this.destinationPath('src/templates/views/home.html'),
				{
					title: this.appName
				}
			);

			this.fs.copyTpl(
				this.templatePath('scripts/controllers/homeController.js'),
				this.destinationPath('src/scripts/controllers/homeController.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copyTpl(
				this.templatePath('scripts/controllers/mainController.js'),
				this.destinationPath('src/scripts/controllers/mainController.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copyTpl(
				this.templatePath('scripts/controllers/settingsController.js'),
				this.destinationPath('src/scripts/controllers/settingsController.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copyTpl(
				this.templatePath('scripts/app.js'),
				this.destinationPath('src/scripts/app.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copyTpl(
				this.templatePath('scripts/config/route.js'),
				this.destinationPath('src/scripts/config/route.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copyTpl(
				this.templatePath('scripts/config/run.js'),
				this.destinationPath('src/scripts/config/run.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copy(
				this.templatePath('_karma.conf.js'),
				this.destinationPath('karma.conf.js')
			);

			this.fs.copy(
				this.templatePath('_protractor.conf.js'),
				this.destinationPath('protractor.conf.js')
			);

			this.fs.copy(
				this.templatePath('_vendor.json'),
				this.destinationPath('vendor.json')
			);

			this.fs.copy(
				this.templatePath('splash.png'),
				this.destinationPath('resources/splash.png')
			);

			this.fs.copy(
				this.templatePath('icon.png'),
				this.destinationPath('resources/icon.png')
			);

			this.fs.copyTpl(
				this.templatePath('test/unit/app.spec.js'),
				this.destinationPath('test/unit/app.spec.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copyTpl(
				this.templatePath('test/unit/route.spec.js'),
				this.destinationPath('test/unit/route.spec.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copyTpl(
				this.templatePath('test/unit/run.spec.js'),
				this.destinationPath('test/unit/run.spec.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copyTpl(
				this.templatePath('test/unit/homeController.spec.js'),
				this.destinationPath('test/unit/homeController.spec.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copyTpl(
				this.templatePath('test/unit/mainController.spec.js'),
				this.destinationPath('test/unit/mainController.spec.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copyTpl(
				this.templatePath('test/unit/settingsController.spec.js'),
				this.destinationPath('test/unit/settingsController.spec.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copyTpl(
				this.templatePath('test/e2e/app.home.spec.js'),
				this.destinationPath('test/e2e/app.home.spec.js'),
				{
					ngModulName: _.classify(this.appName)
				}
			);

			this.fs.copy(
				this.templatePath('test/e2e/app.settings.spec.js'),
				this.destinationPath('test/e2e/app.settings.spec.js')
			);

			this.fs.copy(
				this.templatePath('test/e2e/sideMenu.spec.js'),
				this.destinationPath('test/e2e/sideMenu.spec.js')
			);

			this.fs.copy(
				this.templatePath('test/e2e/pageObjects/MainPageObjects.js'),
				this.destinationPath('test/e2e/pageObjects/MainPageObjects.js')
			);

			this.fs.copy(
				this.templatePath('test/e2e/pageObjects/SideMenuPageObjects.js'),
				this.destinationPath('test/e2e/pageObjects/SideMenuPageObjects.js')
			);
		}
	},

	install: function () {
		this.installDependencies();
	}
});
