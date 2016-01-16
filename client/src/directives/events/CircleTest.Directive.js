var CircleTest_Directive = function(d3){
    return {
        scope: {
            
        },
        compile(element, attrs, transclude){
            var svg = d3.select(element[0])
                .append('svg')
                .attr('width', 600)
                .attr('height', 300);
            svg.on('click', function(){
                var e = d3.event;
                
                var xpos = (e.offsetX == undefined) ? e.layerX : e.offsetX;
                var ypos = (e.offsetY == undefined) ? e.layerY : e.offsetY;
                
                svg.append('circle')
                    .attr('cx', xpos)
                    .attr('cy', ypos)
                    .style('fill', 'steelblue')
                    .attr('r', 50)
            });
            return function(scope, element, attrs){
                
            };
        }
    };
};

module.exports = CircleTest_Directive;