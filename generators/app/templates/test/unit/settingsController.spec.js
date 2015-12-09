/* globals describe, beforeEach, module, inject, it, expect */
'use strict';

describe('SettingsController', function () {
	var $scope, ctrl;

	beforeEach(function() {
		module('<%= ngModulName %>');

		inject(function($controller, $rootScope) {
			$scope = $rootScope.$new();
			ctrl = $controller('SettingsController', {
	  			$scope: $scope
			});
		});
	});

	it('passes if string is empty', function() {
        expect('').toBe('');
    });
});
