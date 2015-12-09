(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name <%= ngModulName %>.controller:SettingsController
	 * @description
	 * # SettingsController
	 */

	var inject = [];

	function SettingsController() {

	}

	angular
		.module('<%= ngModulName %>')
		.controller('SettingsController', SettingsController);

	SettingsController.$inject = inject;
})();
