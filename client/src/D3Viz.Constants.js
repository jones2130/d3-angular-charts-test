var angular = require('angular');

var app = angular.module('D3Viz.Constants', [])
//    .constant('CHART_OPTIONS', {
//        dateRange: {
//            start: '2015-01-01T00:00:00Z',
//            end: '2026-01-02T15:42:21Z'
//        }
//    })
    .constant('BARGRAPH_OPTIONS', {})
    .constant('LINEGRAPH_OPTIONS', {
        duration: 3500
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