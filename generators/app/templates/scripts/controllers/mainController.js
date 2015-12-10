/* globals angular */
'use strict';

(function() {

	/**
	 * @ngdoc function
	 * @name <%= ngModulName %>.controller:MainController
	 * @description
	 * # MainController
	 */

	var inject = [];

	function MainController() {
	}

	angular
		.module('<%= ngModulName %>')
		.controller('MainController', MainController);

	MainController.$inject = inject;
})();
