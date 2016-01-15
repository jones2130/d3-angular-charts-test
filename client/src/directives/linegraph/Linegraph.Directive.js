var Linegraph_Directive = function(LINEGRAPH_OPTIONS, d3){
    function draw(svg, width, height, data){
        svg.attr('width', width)
            .attr('height', height);
        
        var margin = LINEGRAPH_OPTIONS.margin;
        var minimumY = d3.min(data, function(d){return d.y});
        
        var xScale = d3.time.scale()
            .domain(d3.extent(data, function(d){return d.x}))
            .range([margin, width - margin]);
            
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient(LINEGRAPH_OPTIONS.xAxis.orientation)
            .tickFormat(d3.time.format(LINEGRAPH_OPTIONS.xAxis.format));
        
        var yScale = d3.time.scale()
            .domain([d3.max(data, function(d){return d.y;}), 0])
            .range([margin, height - margin]);
        
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient(LINEGRAPH_OPTIONS.yAxis.orientation)
            .tickFormat(d3.format(LINEGRAPH_OPTIONS.yAxis.format));
        
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
            .attr('r', LINEGRAPH_OPTIONS.dataPoints.radius)
            .attr('class', 'data-point');
        
        svg.select('.data').selectAll('circle').data(data)
            .attr('cx', function(d){return xScale(d.x);})
            .attr('cy', function(d){return yScale(minimumY);})
            .transition().duration(LINEGRAPH_OPTIONS.duration)
            .attr('cx', function(d){return xScale(d.x)})
            .attr('cy', function(d){return yScale(d.y)});
        
        svg.select('.data').selectAll('circle').data(data).exit().remove();
        
        svg.select('.data')
            .selectAll('circle').data(data)
            
        var line = d3.svg.line()
            .x(function(d){return xScale(d.x);})
            .y(function(d){return yScale(d.y);})
            .interpolate(LINEGRAPH_OPTIONS.interpolation);
        
        svg.select('.data-line')
            .datum(data)
            .transition()
            .duration(LINEGRAPH_OPTIONS.duration)
            .attrTween('d', function(){            
            var start = data.map(function(d){
                return {x: d.x, y: minimumY};
            });
            
            var interpolate = interpolatePoints(start, data);
            
            return function(t){
                return line(interpolate(t));
            }
        });
        
        var area = d3.svg.area()
            .x(function(d){return xScale(d.x);})
            .y0(function(d){return yScale(0);})
            .y1(function(d){return yScale(d.y);})
            .interpolate(LINEGRAPH_OPTIONS.interpolation);
        
        svg.select('.data-area')
            .datum(data)
            .transition()
            .duration(LINEGRAPH_OPTIONS.duration)
            .attrTween('d', function(){            
            var start = data.map(function(d){
                return {x: d.x, y: minimumY};
            });
            
            var interpolate = interpolatePoints(start, data);
            
            return function(t){
                return area(interpolate(t));
            };
        });
    }
    
    function interpolatePoints(A,B){
        var interpolate_x = d3.interpolateArray(A.map(function(d){return d.x;}), B.map(function(d){return d.x;}));
        var interpolate_y = d3.interpolateArray(A.map(function(d){return d.y;}), B.map(function(d){return d.y;}));
        
        return function(t){
            var x = interpolate_x(t);
            var y = interpolate_y(t);
            
            return x.map(function(d,i){
                return {
                    x: x[i],
                    y: y[i]
                };
            });
        };
    }
    
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