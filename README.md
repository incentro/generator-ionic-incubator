# generator-ionic-incubator [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Yeoman generator for Ionic Projects. Sets up a default Ionic template with E2E testing and Unit testing.

## Features

* [Gulp](http://gulpjs.com/) for task automation
* Compiles and concats your sass
* Local development server with [Apache Ripple](http://ripple.incubator.apache.org/) included
* Providing custom Ionic changes in a seperate sass file
* [ng-cordova](http://ngcordova.com/) is built in

## Installation

First, install [Yeoman](http://yeoman.io) and generator-ionic-incubator using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-ionic-incubator
```

Then generate your new project inside your app directory:

```bash
yo ionic-incubator
```

To run the application just run:

```bash
gulp
```

## Workflow commands

### `gulp` or `gulp default`

Runs the following commands: `clean, fonts, templates, styles, images, vendor, buildIndex, watchers, serve`

### `gulp -b` or `gulp default -b`

Runs the following commands: `clean, fonts, templates, styles, images, vendor, buildIndex`

### `gulp -e` or `gulp default -e`

Runs the following commands: `clean, fonts, templates, styles, images, vendor, buildIndex, ionic:emulate, watchers`
(Make sure you've added a platform before running this command)

### `gulp -r` or `gulp default -r`

Runs the following commands: `clean, fonts, templates, styles, images, vendor, buildIndex, ionic:run`
(Make sure you've added a platform before running this command)

### `gulp clean`

Deletes the `www` folder.

### `gulp styles`

Concatenates, autoprefixes and strips comments from the scss files into a single main.css file.

### `gulp scripts`

Concatenates, and uglifies js files from the templates and scripts directories into a single app.js file.

### `gulp fonts`

Builds a webfont from the Ionicons webfont.

### `gulp templates`

Copies the templates directory from the `src` folder to the `www` folder.

### `gulp images`

Copies the images directory from the `src` folder to the `www` folder.

### `gulp jsHint`

Lints the js files based on the .jshintrc ruleset.

### `gulp vendor`

Concatenates and uglifies all the vendor scripts and places the vendor.js file in the `www` directory.

### `gulp buildIndex`

Injects the css and js files into the index.html file.

### `gulp karma`

Runs the [Karma](http://karma-runner.github.io/) unit tests.

### `gulp protractor`

Runs the [Protractor](http://www.protractortest.org/) E2E tests.

### `gulp watchers`

Starts watching the scss, fonts, images and template files.

### `gulp ripple`

Launches [Apache Ripple](http://ripple.incubator.apache.org/) (make sure you've added a platform before running this command).

## Changelog

### 0.1.0

* Update to [Ionic 1.2.0](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md#120-zirconium-zeren-2015-12-09).
* Update the readme.
* Change the tilde into a carret for angular-mocks.

## License

MIT © [Pieter Bogaerts](http://www.goedonthouden.com/)


[npm-image]: https://badge.fury.io/js/generator-ionic-incubator.svg
[npm-url]: https://npmjs.org/package/generator-ionic-incubator
[travis-image]: https://travis-ci.org/PizzaPete/generator-ionic-incubator.svg?branch=master
[travis-url]: https://travis-ci.org/PizzaPete/generator-ionic-incubator
[daviddm-image]: https://david-dm.org/PizzaPete/generator-ionic-incubator.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/PizzaPete/generator-ionic-incubator
