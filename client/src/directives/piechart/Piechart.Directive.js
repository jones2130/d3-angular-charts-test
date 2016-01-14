var Piechart_Directive = function(PIECHART_OPTIONS, d3){
    function draw(svg, width, height, data){
        width = width - PIECHART_OPTIONS.margins.left - PIECHART_OPTIONS.margins.right;
        height = height - PIECHART_OPTIONS.margins.top - PIECHART_OPTIONS.margins.bottom;
        
        var radius = Math.min(width, height) / 2;

        var arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(0);
        var pie = d3.layout.pie();

        pie.sort(null)
            .value(function(d){
            return d.x;
        });

        var translateCenter = ('translate(' + width / 2 + ',' + height / 2 + ')');

        svg.select('.bg')
            .attr('transform', translateCenter);

        svg.select('.bg circle')
            .attr('r', radius);

        svg.select('.data')
            .attr('transform', translateCenter);

        var dataArcs = svg.select('.data').selectAll('.data path').data(pie(data));

        dataArcs.enter()
            .append('path')
            .attr('d', arc)
            .style('fill', function(d,i){return PIECHART_OPTIONS.colors[i]})

        dataArcs.transition().duration(0)
            .attr('d', arc);

        dataArcs.exit()
            .remove();

        svg.select('.ring')
            .attr('transform', translateCenter);

        svg.select('.ring circle')
            .attr('r', radius);
    }
    
    return {
        scope: {
            data: '='
        },
        compile(element, attrs, transclude){
            var svg = d3.select(element[0]).append('svg');
            
            svg.append('g').attr('class', 'bg')
                .append('circle');
            
            svg.append('g')
                .attr('class', 'data');
            
            svg.append('g').attr('class', 'ring')
                .append('circle');
            
            var width_Piechart = element[0].offsetWidth;
            var height_Piechart = element[0].offsetHeight;
            
            var chartData = [];
            
            return function($scope, element, attr){
                $scope.width = width_Piechart;
                $scope.height = height_Piechart;
                
                $scope.$watch('data', function(newValue, oldValue){
                    chartData = $scope.data.map(function(d){
                        return {
                            x: d.value
                        }
                    });
                    
                    draw(svg, width_Piechart, height_Piechart, chartData);
                }, true);
                
                $scope.$on('Home_WindowResized', function(){
                    var svgElement = element[0].children[0];
                    
                    element[0].children[0].remove();
                    
                    var elementWidth = element[0].offsetWidth;
                    var elementHeight = element[0].offsetHeight;
                    
                    element[0].appendChild(svgElement);
                    
                    if(elementWidth != width_Piechart || elementHeight != height_Piechart){
                        width_Piechart = element[0].offsetWidth;
                        height_Piechart = element[0].offsetHeight;
                        
                        svg.selectAll('g')
                            .remove();
                        
                        svg.append('g').attr('class', 'bg')
                            .append('circle');

                        svg.append('g')
                            .attr('class', 'data');

                        svg.append('g').attr('class', 'ring')
                            .append('circle');
                        
                        draw(svg, width_Piechart, height_Piechart, chartData);  
                    };
                });
            };
        }
    };
};

module.exports = Piechart_Directive;