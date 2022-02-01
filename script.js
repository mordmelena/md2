
var point = document.getElementsByClassName("point");

var input = {
    mouseX: {
        start:0,
        end: window.innerWidth,
        current:0,
    },
    mouseY: {start:0,
        end: window.innerHeight,
        current:0,}
}
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;


var output = {
    x: {
        start: -30,
        end: 30,
        current: 0,
    },
    y: {
        start: -30,
        end: 30,
        current: 0,
    },
}

output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;


var handleMouseMove = function (event){
    input.mouseX.current = event.clientX;
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start)/ input.mouseX.range;

    input.mouseY.current = event.clientY;
    input.mouseY.fraction = (input.mouseY.current - input.mouseY.start)/ input.mouseY.range;


    //change to + to follow mouse direction, play around with start/end
    output.x.current = output.x.start + (input.mouseX.fraction * output.x.range);
    output.y.current = output.y.start + (input.mouseY.fraction * output.y.range);

    Array.prototype.forEach.call(point, function (p){
        p.style.transform = 'translate('+output.x.current+'px,'+output.y.current+ 'px)';
    });
    // pointArray.forEach(function (point, i){
    //     point.style.transform = 'translateX(75px)';
    // } );
// keep the range 0 to 1
//     if (input.mouseX.fraction > 1){ input.mouseX.fraction = 1; }
//     if (input.mouseX.fraction < 0){input.mouseX.fraction = 0; }
//     console.log("output.x.current", output.x.current);
//     console.log("fractionY", input.mouseY.fraction);

    };

var handleResize = function (event){
    input.mouseX.end = window.innerWidth;
    input.mouseX.range = input.mouseX.end - input.mouseX.start;
};


// window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleResize);



