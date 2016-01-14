var PiechartTestCtrl = function($interval, $rootScope, $scope){
    self = this;
    
    self.generateData = function(num){
        result = [];
        
        for(var i = 0; i < num; i++){
            result[i] = {value: (Math.random() * 100) + 1};    
        }
        
        return result;
    };
    
    self.piechartData = self.generateData(5);
    
    $interval(function(){
        self.piechartData = self.generateData(5);
    }, 5000);
};

module.exports = PiechartTestCtrl;