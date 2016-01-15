var angular = require('angular');

var app = angular.module('D3Viz.Constants', [])
    .constant('BARGRAPH_OPTIONS', {})
    .constant('LINEGRAPH_OPTIONS', {
        dataPoints: {
            radius: 2.5
        },
        duration: 500,
        interpolation: 'linear',
        margin: 30,
        xAxis: {
            orientation: 'bottom',
            format: '%Y'
        },
        yAxis: {
            orientation: 'left',
            format: 'f'
        }
    })
    .constant('PIECHART_OPTIONS', {
        colors: ['#FF0000','#00FF00','#0000FF','#FFFF00','#00FFFF'],
        margins: {
            top: 1,
            left: 1,
            bottom: 2,
            right: 2
        }
    })

module.exports = app;