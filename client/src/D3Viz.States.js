var angular = require('angular');
require('angular-ui-router');

var app = angular.module('D3Viz.States', ['ui.router'])
	.value('API', 'api_key')
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider
			.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				abstract: true,
				templateUrl: 'src/templates/Home.htm',
				controller: 'HomeCtrl',
				controllerAs: 'home',
				data: {
					requiresLogin: false
				}
			})
			.state('home.app', {
				url: '',
				views: {
                    'bargraphTest': {
                        templateUrl: 'src/templates/BargraphTest.htm'
                    },
                    'eventsTest': {
                        templateUrl: 'src/templates/EventsTest.htm'
                    },
                    'logGenerator' : {
                        templateUrl: 'src/templates/LogGenerator.htm'
                    },
                    'piechartTest' : {
                        templateUrl: 'src/templates/PiechartTest.htm'
                    },
                    'linegraphTest': {
                        templateUrl: 'src/templates/LinegraphTest.htm'
                    }
				}
			})
}]);
module.exports = app;