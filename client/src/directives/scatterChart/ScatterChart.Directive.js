var ScatterChart_Directive = function(d3){
    function draw(svg, width, height, data){
        svg.attr('width', width)
            .attr('height', height);
        
        var margin = 30;
        
        var xScale = d3.time.scale()
            .domain(d3.extent(data, function(d){return d.x}))
            .range([margin, width - margin]);
            
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('top')
            .tickFormat(d3.time.format('%S'));
        
        var yScale = d3.time.scale()
            .domain([0, d3.max(data, function(d){return d.y;})])
            .range([margin, height - margin]);
        
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .tickFormat(d3.format('f'));
        
        svg.select('.x-axis')
            .attr('transform', 'translate(0, ' + margin + ')')
            .call(xAxis);
        
        svg.select('.y-axis')
            .attr('transform', 'translate(' + margin + ')')
            .call(yAxis);
        
        svg.select('.data')
            .selectAll('circle').data(data)
            .enter()
            .append('circle');
        
        svg.select('.data')
            .selectAll('circle')
            .attr('r', 2.5)
            .attr('cx', function(d){ return xScale(d.x);})
            .attr('cy', function(d){ return yScale(d.y);});
    };
    
    return {
        restrict: 'E',
        scope:{
            data: '='
        },
        compile: function(element, attrs, transclude){
            var svg = d3.select(element[0]).append('svg');
            
            svg.append('g').attr('class', 'data');
            svg.append('g').attr('class', 'x-axis axis');
            svg.append('g').attr('class', 'y-axis axis');
            
            var width = 600;
            var height = 300;
            
            return function(scope, element, attrs){
                scope.$watch('data', function(newValue, oldValue){
                    
                    var data = scope.data.map(function(d){
                        return {
                            x: d.time,
                            y: d.visitors
                        }
                    });
                    draw(svg, width, height, data);
                }, true);
            };
        }
    };
};

module.exports = ScatterChart_Directive;