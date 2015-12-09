(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name <%= ngModulName %>
	 * @description
	 * # Initializes the routing
	 *
	 * Routing module of the application.
	 */

	 var inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider'];

	function config($httpProvider, $stateProvider, $urlRouterProvider){
		$stateProvider
			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/main.html',
				controller: 'MainController'
			})
			.state('app.home', {
				url: '/home',
				cache: true,
				views: {
					'viewContent': {
						templateUrl: 'templates/views/home.html',
						controller: 'HomeController'
					}
				}
			})
			.state('app.settings', {
				url: '/settings',
				cache: true,
				views: {
					'viewContent': {
						templateUrl: 'templates/views/settings.html',
						controller: 'SettingsController'
					}
				}
			});


		// redirects to default route for undefined routes
		$urlRouterProvider.otherwise('/app/home');
	}

	angular
		.module('<%= ngModulName %>')
		.config(config);

	config.$inject = inject;
})();
