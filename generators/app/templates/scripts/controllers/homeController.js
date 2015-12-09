(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name <%= ngModulName %>.controller:HomeController
	 * @description
	 * # HomeController
	 */

	var inject = ['$scope'];

	function HomeController($scope) {

		$scope.myText = null;

		$scope.getText = function() {
			$scope.myHTML = '<h2><%= ngModulName %></h2>';
            $scope.$broadcast('scroll.refreshComplete');
		}

		$scope.getText();
	}

	angular
		.module('<%= ngModulName %>')
		.controller('HomeController', HomeController);

	HomeController.$inject = inject;
})();
