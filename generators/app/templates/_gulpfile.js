/* globals console, require */
'use strict';

// Change to desired application name
var appName = '<%= ngModulName %>';

var chalk = require('chalk');
var del = require('del');
var gulp = require('gulp');
var gulpProtractorAngular = require('gulp-angular-protractor');
var karma = require('karma');
var open = require('open');
var path = require('path');
var plugins = require('gulp-load-plugins')();
var ripple = require('ripple-emulator');
var runSequence = require('run-sequence');
var streamqueue = require('streamqueue');

/**
 * Parse arguments
 */
var args = require('yargs')
    .alias('e', 'emulate')
    .alias('b', 'build')
    .alias('r', 'run')
    .alias('release', 'strip-debug')
    .default('build', false)
    .default('port', 8100)
    .default('strip-debug', false)
    .argv;

var build = !!(args.build || args.emulate || args.run);
var emulate = args.emulate;
var run = args.run;
var stripDebug = !!args.stripDebug;
var targetDir = 'www';

if (emulate === true) {
	emulate = 'ios';
}
if (run === true) {
	run = 'ios';
}

// Global error handler
var errorHandler = function(error) {
	if (build) {
		throw error;
	} else {
		plugins.util.log(error);
	}
};

// Global configuration
var config = {
    path: {
        src: {
            root: 'src',
            asset: {
                javascript: './src/scripts',
                images: './src/images',
                templates: './src/templates',
                scss: './src/styles',
                fonts: './src/fonts'
            }
        }
    },
    autoprefix: {
        support: 'last 1 Chrome version, iOS >= 7, Android >= 4.1'
    }
};

// Clean target dir
gulp.task('clean', function() {
	return del([targetDir]);
});

// Precompile .scss and concat with ionic.css
gulp.task('styles', function() {

	var options = build ? { outputStyle: 'compressed' } : { outputStyle: 'expanded' };

	return gulp.src(config.path.src.asset.scss + '/main.scss')
		.pipe(plugins.sass(options))
		.pipe(plugins.autoprefixer(config.autoprefix.support.split(', ')))
		.pipe(plugins.cleanCss('main.css'))
		.pipe(plugins.if(build && !emulate, plugins.rev()))
		.pipe(gulp.dest(path.join(targetDir, 'styles')))
		.on('error', errorHandler);
});

// Build templatecache, copy scripts.
gulp.task('scripts', function() {
	var dest = path.join(targetDir, 'scripts');

	var minifyConfig = {
		collapseWhitespace: true,
		collapseBooleanAttributes: true,
		removeAttributeQuotes: true,
		removeComments: true
	};

	// Prepare angular template cache from html templates
	var templateStream = gulp
		.src('**/*.html', { cwd: config.path.src.asset.templates})
		.pipe(plugins.angularTemplatecache('templates.js', {
			root: 'templates/',
			module: appName,
			htmlmin: build && minifyConfig
		}));

	var scriptStream = gulp
		.src(['templates.js', '**/*.js'], { cwd: config.path.src.asset.javascript })

	.pipe(plugins.if(!build, plugins.changed(dest)));

	return streamqueue({ objectMode: true }, scriptStream, templateStream)
		.pipe(plugins.if(stripDebug, plugins.stripDebug()))
		.pipe(plugins.if(build, plugins.concat('app.js')))
		.pipe(plugins.if(build, plugins.uglify()))
		.pipe(plugins.if(build && !emulate, plugins.rev()))
		.pipe(gulp.dest(dest))
		.on('error', errorHandler);
});

// Copy fonts
gulp.task('fonts', function() {
	return gulp
		.src([config.path.src.asset.fonts + '/*.*', './bower_components/ionic/release/fonts/*.*'])
		.pipe(gulp.dest(path.join(targetDir, 'fonts')))
		.on('error', errorHandler);
});

// Copy templates
gulp.task('templates', function() {
	return gulp.src(config.path.src.asset.templates + '/**/*.*')
		.pipe(gulp.dest(path.join(targetDir, 'templates')))
		.on('error', errorHandler);
});

// Copy images
gulp.task('images', function() {
	return gulp.src(config.path.src.asset.images + '/**/*.*')
		.pipe(gulp.dest(path.join(targetDir, 'images')))
		.on('error', errorHandler);
});

// Lint js sources based on .jshintrc ruleset
gulp.task('jsHint', function() {
	return gulp
		.src(config.path.src.asset.scripts + '/**/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter())
		.on('error', errorHandler);
});

// Concatenate and minify vendor sources
gulp.task('vendor', function() {
	var vendorFiles = require('./vendor.json');

	return gulp.src(vendorFiles)
		.pipe(plugins.concat('vendor.js'))
		.pipe(plugins.if(build, plugins.uglify()))
		.pipe(plugins.if(build, plugins.rev()))
		.pipe(gulp.dest(targetDir))
		.on('error', errorHandler);
});

// Inject the built files in index.html
gulp.task('buildIndex', ['jsHint', 'scripts'], function() {

	// Build has a '-versionnumber' suffix
	var cssNaming = 'styles/main*';

	// Injects 'src' into index.html at position 'tag'
	var _inject = function(src, tag) {
		return plugins.inject(src, {
			starttag: '<!-- inject:' + tag + ':{{ext}} -->',
			read: false,
			addRootSlash: false
		});
	};

	// Gets all the javascript sources
	var _getAllScriptSources = function() {
	var scriptStream = gulp.src(['scripts/app.js', 'scripts/**/*.js'], { cwd: targetDir });
		return streamqueue({ objectMode: true }, scriptStream);
	};

	return gulp.src('src/index.html')
		.pipe(_inject(gulp.src(cssNaming, { cwd: targetDir }), 'app-styles'))
		.pipe(_inject(gulp.src('vendor*.js', { cwd: targetDir }), 'vendor'))
		.pipe(plugins.if(build, _inject(gulp.src('scripts/app*.js', { cwd: targetDir }), 'app'), _inject(_getAllScriptSources(), 'app')))
		.pipe(gulp.dest(targetDir))
		.on('error', errorHandler);
});

// Ionic emulate wrapper
gulp.task('ionic:emulate', plugins.shell.task([
	'ionic emulate ' + emulate + ' --livereload --consolelogs'
]));

// Ionic run wrapper
gulp.task('ionic:run', plugins.shell.task([
	'ionic run ' + run
]));

// Ionic emulate wrapper
gulp.task('serve', plugins.shell.task([
	'ionic serve'
]));

// Unit tests
gulp.task('karma', function(done) {
	build = true;
	gulp.run('default');
	var server = new karma.Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);
	return server.start();
});

// E2E tests
gulp.task('protractor', function(callback) {
	console.log(chalk.inverse('Make sure you run "gulp default" before running "gulp protractor"'));
    gulp
        .src(['/test/e2e/**/*.js'])
        .pipe(gulpProtractorAngular({
            configFile: './protractor.conf.js',
            debug: false,
            autoStartStopServer: true
        }))
        .on('error', function(e) {
            console.log(e);
            console.log(chalk.inverse('Make sure you run "gulp default" before running "gulp protractor"'));
        })
        .on('end', callback);
});

// Start watchers
gulp.task('watchers', function() {
	plugins.livereload.listen();
	gulp.watch('src/styles/**/*.scss', ['styles']);
	gulp.watch('src/fonts/**', ['fonts']);
	gulp.watch('src/images/**', ['images']);
	gulp.watch('src/scripts/**/*.js', ['buildIndex']);
	gulp.watch('./vendor.json', ['vendor']);
	gulp.watch('src/templates/**/*.html', ['buildIndex']);
	gulp.watch('src/index.html', ['buildIndex']);
	gulp.watch(targetDir + '/**')
	.on('change', plugins.livereload.changed)
	.on('error', errorHandler);
});

// No-op = empty function
gulp.task('noop', function() {});

// Ripple emulator
gulp.task('ripple', ['scripts', 'styles', 'watchers'], function() {

	var options = {
		keepAlive: false,
		open: true,
		port: 4400
	};

	// Start the ripple server
	ripple.emulate.start(options);

	open('http://localhost:' + options.port + '?enableripple=true');
});

gulp.task('default', function() {
	runSequence(
		'clean', ['fonts', 'templates', 'styles', 'images', 'vendor'], 'buildIndex',
		build ? 'noop' : 'watchers',
		build ? 'noop' : 'serve',
		emulate ? ['ionic:emulate', 'watchers'] : 'noop',
		run ? 'ionic:run' : 'noop'
	);
});
