var Bargraph_Directive = function(BARGRAPH_OPTIONS, d3){
    function draw(svg, width, height, data){
        svg.attr('width', width)
            .attr('height', height);
        
        var margin = 30;
        var barWidth = (width - (margin * 2)) / data.length;
        var barPadding = 1;
        
        var xScale = d3.time.scale()
            .domain(d3.extent(data, function(d){return d.x}))
            .range([margin, width - margin]);
        
        var barXScale = d3.time.scale()
            .domain(d3.extent(data, function(d){return d.x}))
            .range([margin, width - barWidth - margin]);
        
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
            .selectAll('rect').data(data)
            .enter()
            .append('rect')
            .attr('class', 'data-bar');
        
        svg.select('.data')
            .selectAll('rect').data(data)
            .attr('x', function(d){return barXScale(d.x);})
            .attr('y', function(d){return yScale(d.y);})
            .attr('width', function(d){return barWidth - barPadding;})
            .attr('height', function(d){ return yScale(0) - yScale(d.y);});
        
        svg.select('.data').selectAll('rect').data(data).exit().remove();
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

module.exports = Bargraph_Directive;