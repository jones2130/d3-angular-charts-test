var angular = require('angular');
require('./D3Viz.Constants');

var app = angular.module('D3Viz.Services', ['D3Viz.Constants']);

app.factory('Util', function(){
    var api = {};
    
    api.isPartOf = function(child, parent){
        var element = child;
        
        while(element.parentElement != null)
        {
            if(element == parent)
            {
                return true;
            }
            
            element = element.parentElement;
        }
        
        return false;
    };
    
    return api;
});

app.factory('d3', function(){
    var d3 = require('d3');
    
    return d3;
});

module.exports = app;