/* globals describe, beforeEach, module, inject, it, expect */
'use strict';

describe('MainController', function () {
	var $scope;

	beforeEach(function() {
		module('<%= ngModulName %>');

		inject(function($controller, $rootScope) {
			$scope = $rootScope.$new();
			$controller('MainController', {
				$scope: $scope
			});
		});
	});

	it('passes if string is empty', function() {
        expect('').toBe('');
    });
});
