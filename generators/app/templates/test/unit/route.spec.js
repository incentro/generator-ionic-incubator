/* globals describe, beforeEach, module, inject, it, expect */
'use strict';

// Based on: http://nikas.praninskas.com/angular/2014/09/27/unit-testing-ui-router-configuration/

describe('config', function () {
	var $state, $templateCache, $location, $rootScope;

	function mockTemplate(templateRoute, tmpl) {
		$templateCache.put(templateRoute, tmpl || templateRoute);
	}

	beforeEach(function() {
		module('<%= ngModulName %>');

		inject(function (_$state_, _$templateCache_, _$location_, _$rootScope_) {
			$state = _$state_;
			$templateCache = _$templateCache_;
			$location = _$location_;
			$rootScope = _$rootScope_;
		});
	});

	describe('path', function () {
		function goTo(url) {
			$location.url(url);
			$rootScope.$digest();
		}

		beforeEach(function () {
			mockTemplate('templates/views/home.html');
			mockTemplate('templates/views/settings.html');
			mockTemplate('templates/main.html');
		});

		describe('when empty', function () {
			it('should go to the home state', function () {
				goTo('');
				expect($state.current.name).toEqual('app.home');
			});
		});

		describe('/', function () {
			it('should go to the home state', function () {
				goTo('/');
				expect($state.current.name).toEqual('app.home');
			});
		});

		describe('/app', function () {
			it('should go to the home state', function () {
				goTo('/app');
				expect($state.current.name).toEqual('app.home');
			});
		});

		describe('/app/home', function () {
			it('should go to the home state', function () {
				goTo('/app/home');
				expect($state.current.name).toEqual('app.home');
			});
		});

		describe('/app/settings', function () {
			it('should go to the settings state', function () {
				goTo('/app/settings');
				expect($state.current.name).toEqual('app.settings');
			});
		});

		describe('otherwise', function () {
			it('should go to the home state', function () {
				goTo('someNonExistentUrl');
				expect($state.current.name).toEqual('app.home');
			});
		});
	});
});
