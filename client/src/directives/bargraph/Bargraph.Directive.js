var Bargraph_Directive = function(BARGRAPH_OPTIONS, d3){
    function draw(svg, width, height, data){
        svg.attr('width', width)
            .attr('height', height);
        
        if(BARGRAPH_OPTIONS.easing){
            easing = d3.ease(BARGRAPH_OPTIONS.easing);   
        }
        
        var margin = BARGRAPH_OPTIONS.margin;
        var barWidth = (width - (margin * 2)) / data.length;
        var barPadding = BARGRAPH_OPTIONS.padding;
        var maxY = d3.max(data, function(d){return d.y});
        
        var xScale = d3.time.scale()
            .domain(d3.extent(data, function(d){return d.x}))
            .range([margin, width - margin]);
        
        var barXScale = d3.time.scale()
            .domain(d3.extent(data, function(d){return d.x}))
            .range([margin, width - barWidth - margin]);
        
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient(BARGRAPH_OPTIONS.xAxis.orientation)
            .tickFormat(d3.time.format(BARGRAPH_OPTIONS.xAxis.format));
        
        var yScale = d3.time.scale()
            .domain([d3.max(data, function(d){return d.y;}), 0])
            .range([margin, height - margin]);
        
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient(BARGRAPH_OPTIONS.yAxis.orientation)
            .tickFormat(d3.format(BARGRAPH_OPTIONS.yAxis.format));
        
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
            .attr('width', function(d){return barWidth - barPadding;})
            .attr('y', function(d){return yScale(0);})
            .attr('height', 0)
            .transition().duration(function(d,i){
                if(BARGRAPH_OPTIONS.stagger){
                    return BARGRAPH_OPTIONS.duration * (d.y/maxY);
                } else {
                   return BARGRAPH_OPTIONS.duration;                    
                }})
            .delay(function(d,i){
                if(easing && BARGRAPH_OPTIONS.stagger){
                    return BARGRAPH_OPTIONS.duration*easing(i+1)/data.length;
                } else if(BARGRAPH_OPTIONS.stagger) {
                    return 100*i;
                } else {
                    return 0;
                }
            })
            .attr('y', function(d){return yScale(d.y);})
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