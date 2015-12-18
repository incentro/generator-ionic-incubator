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

	var inject = ['$ionicPlatform'];

	function runBlock(){
	}

	angular
		.module('<%= ngModulName %>')
		.run(runBlock);

	runBlock.$inject = inject;
})();
