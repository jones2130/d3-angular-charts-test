var Linegraph_Directive = function(LINEGRAPH_OPTIONS, d3){
    function draw(svg, width, height, data){
        svg.attr('width', width)
            .attr('height', height);
        
        var margin = 30;
        
        var xScale = d3.time.scale()
            .domain(d3.extent(data, function(d){return d.x}))
            .range([margin, width - margin]);
            
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .tickFormat(d3.time.format('%Y'));
        
        var yScale = d3.time.scale()
            .domain([d3.max(data, function(d){return d.y;}), 0])
            .range([margin, height - margin]);
        
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .tickFormat(d3.format('f'));
        
        svg.select('.x-axis')
            .attr('transform', 'translate(0, ' + (height - margin) + ')')
            .call(xAxis);
        
        svg.select('.y-axis')
            .attr('transform', 'translate(' + margin + ')')
            .call(yAxis);
        
        svg.select('.data')
            .selectAll('circle').data(data)
            .enter()
            .append('circle')
            .attr('r', 2.5)
            .attr('class', 'data-point')
            .attr('cx', function(d){return xScale(d.x);})
            .attr('cy', function(d){return yScale(d.y);});
        
        svg.select('.data').selectAll('circle').data(data).transition().duration(0)
            .attr('cx', function(d){return xScale(d.x);})
            .attr('cy', function(d){return yScale(d.y);});;
        
        svg.select('.data').selectAll('circle').data(data).exit().remove();
        
        svg.select('.data')
            .selectAll('circle').data(data)
            
            
        
        var line = d3.svg.line()
            .x(function(d){return xScale(d.x);})
            .y(function(d){return yScale(d.y);})
            .interpolate('linear');
        
        svg.select('.data-line').datum(data).attr('d', line);
        
        var area = d3.svg.area()
            .x(function(d){return xScale(d.x);})
            .y0(function(d){return yScale(0);})
            .y1(function(d){return yScale(d.y);})
            .interpolate('linear');
        
        svg.select('.data-area')
            .datum(data)
            .attr('d', area);
    };
    
    return {
        scope: {
            data: '='
        },
        compile(element, attr, transclude){
            var svg = d3.select(element[0]).append('svg');
            
            svg.append('g').attr('class', 'data');
            svg.append('g').attr('class', 'x-axis axis');
            svg.append('g').attr('class', 'y-axis axis');
            
            d3.select('.data').append('path').attr('class', 'data-line');
            d3.select('.data').append('path').attr('class', 'data-area');
            
            var width = 600;
            var height = 300;
            
            return function($scope, element, attr){
                $scope.$watch('data', function(newValue, oldValue){
                    console.log($scope.data);
                    var data = $scope.data.map(function(d){
                        return {
                            x: d.time,
                            y: d.visitors
                        }
                    });
                    draw(svg, width, height, data);
                }, true);
            };
            draw(svg, width, height, data);
        }
    };
};

module.exports = Linegraph_Directive;