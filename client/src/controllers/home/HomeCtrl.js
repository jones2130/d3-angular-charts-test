module.exports = function ($http, $rootScope, $scope, $state, $window, store) {
	var self = this;
    
    angular.element($window).bind('resize', function(){
        $rootScope.$broadcast('Home_WindowResized');
    });
}