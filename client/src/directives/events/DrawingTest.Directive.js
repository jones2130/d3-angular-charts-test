var DrawingTest_Directive = function(d3){
    return {
        scope: {
            
        },
        compile(element, attrs, transclude){
            var svg = d3.select(element[0])
                .append('svg')
                .attr('width', 600)
                .attr('height', 300);
            
            var bg = svg.append('rect')
                        .attr('width', 600)
                        .attr('height', 300)
                        .attr('fill', 'white');
            
            var is_drawing = false;
            
            svg.on('mousemove', function(){
                var pos = d3.mouse(this);
                
                if(is_drawing){
                    svg.append('circle')
                        .attr('cx', pos[0])
                        .attr('cy', pos[1])
                        .style('fill', 'red')
                        .attr('r', 3);
                }
            }).on('mousedown', function(){
                is_drawing = true;
            }).on('mouseup', function(){
                is_drawing = false;
            }).on('dblclick', function(){
                svg.selectAll('circle').remove();
            });
            
            return function(scope, element, attrs){
                
            };
        }
    };
};

module.exports = DrawingTest_Directive;