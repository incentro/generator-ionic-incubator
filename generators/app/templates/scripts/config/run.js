/* globals angular */
'use strict';

(function() {

	/**
	 * @ngdoc overview
	 * @name <%= ngModulName %>
	 * @description
	 * # Initializes run block that runs whenever the application starts
	 *
	 * Run module of the application.
	 */

	runBlock.$inject = ['$ionicPlatform'];

	function runBlock() {
	}

	angular
		.module('<%= ngModulName %>')
		.run(runBlock);
})();
