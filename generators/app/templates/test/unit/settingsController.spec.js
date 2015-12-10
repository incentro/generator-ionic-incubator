/* globals describe, beforeEach, module, inject, it, expect */
'use strict';

describe('SettingsController', function () {
	var $scope;

	beforeEach(function() {
		module('<%= ngModulName %>');

		inject(function($controller, $rootScope) {
			$scope = $rootScope.$new();
			$controller('SettingsController', {
				$scope: $scope
			});
		});
	});

	it('passes if string is empty', function() {
        expect('').toBe('');
    });
});
