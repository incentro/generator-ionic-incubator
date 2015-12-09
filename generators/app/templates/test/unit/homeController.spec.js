/* globals describe, beforeEach, module, inject, it, expect */
'use strict';

describe('HomeController', function () {
	var $scope, ctrl;

	beforeEach(function() {
		module('<%= ngModulName %>');

		inject(function($controller, $rootScope) {
			$scope = $rootScope.$new();
			ctrl = $controller('HomeController', {
	  			$scope: $scope
			});
		});
	});

	it('should return null', function () {
		expect($scope.myText).toEqual(null);
	});

	describe('$scope.getText', function () {
		it('should return the correct title', function () {
			$scope.getText();
			expect($scope.myHTML).toEqual('<h2><%= ngModulName %></h2>');
		});
	});
});
