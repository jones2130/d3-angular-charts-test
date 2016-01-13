var LogGeneratorCtrl = function($interval, $rootScope, $scope){
    var self = this;
    
    var time = new Date();

    var randPoint = function(){
        return {
            time: new Date(time.toString()),
            visitors: Math.random()*100
        };
    };
    
    self.logs = [randPoint()];
    
    $interval(function(){
        time.setSeconds(time.getSeconds() + 1);
        self.logs.push(randPoint());
    },1000);
};

module.exports = LogGeneratorCtrl;