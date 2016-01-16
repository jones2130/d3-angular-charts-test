var EventsTest_Directive = function(d3){
    return {
        scope: {
            
        },
        compile(element, attrs, transclude){
            var svg = d3.select(element[0])
                .append('svg')
                .attr('width', 600)
                .attr('height', 300);
            
            var circle = svg.append('circle')
                .attr('cx', 100)
                .attr('cy', 100)
                .attr('r', 50)
                .attr('fill', 'steelblue');
            
            var events = [
                'click', 'dblclick',
                'mouseover', 'mouseenter', 'mouseleave',
                'mousemove', 'mousedown', 'mouseup'
            ];
            
            events.map(function(e){
                circle.on(e, function(e){
                    console.log('Triggered', d3.event.type);
                });
            });
            return function(scope, element, attrs){
                
            };
        }
    };
};

module.exports = EventsTest_Directive;