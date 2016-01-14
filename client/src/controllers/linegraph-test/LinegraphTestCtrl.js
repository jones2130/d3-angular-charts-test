var LinegraphTestCtrl = function($interval, $rootScope, $scope){
    self = this;
    
    var time = new Date();
    
    self.chartData = [];

    function generateData(numPoints){
        var result = [];
        
        for(var i = 0; i < numPoints; i++)
        {
            result.push({
                time: new Date(time.getSeconds() + (i*31536000*1000)),
                visitors: Math.random()*100 + 1
            });
        }
        
        return result;
    };
    
    self.chartData = generateData(30);
    
    $interval(function(){
        self.chartData = generateData(Math.random()*30 + 2);
    },5000);
};

module.exports = LinegraphTestCtrl;