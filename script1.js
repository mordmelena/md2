
var parallaxCollection = document.getElementsByClassName("parallax1");
var parallaxArray = Array.from(parallaxCollection);
var point = document.getElementsByClassName("parallax");
var pum = document.getElementsByClassName("vanya");

var endY = document.documentElement.scrollHeight - window.innerHeight;
var input = {
    scrollY: {
        start: 0,
        end: endY,
        current: 0
    },
    mouseX: {
        start:0,
        end: window.innerWidth,
        current:0,
    },
    mouseY: {
        start:0,
        end: window.innerHeight,
        current:0,
    }
}
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;
input.scrollY.range = (document.documentElement.scrollHeight - window.innerHeight) - input.scrollY.start;

var mouse = {
    x: 0,
    y: 0,
}
var output = {
    x: {
        start: -100,
        end: 100,
        current: 0,
    },
    y: {
        start: -100,
        end: 100,
        current: 0,
    },
}

output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

var updateInputs = function() {
// mouse x input
    input.mouseX.current = mouse.x;
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start)/ input.mouseX.range;
    // mouse y input
    input.mouseY.current = mouse.y;
    input.mouseY.fraction = (input.mouseY.current - input.mouseY.start)/ input.mouseY.range;
// scrollY input
    input.scrollY.current = document.documentElement.scrollTop;
    input.scrollY.fraction = (input.scrollY.current - input.scrollY.start) / (document.documentElement.scrollHeight - window.innerHeight) - input.scrollY.start;
    // console.log(" x" + input.mouseX.current, "y" + input.mouseY.current );

}
var updateOutputs = function () {
    //change to + to follow mouse direction, play around with start/end
    // output.x.current = output.x.start + (input.mouseX.fraction * output.x.range);
    // output.x.opposite = output.x.end - (input.mouseX.fraction * output.x.range);
// scrollY
    output.y.current = output.y.end - (input.scrollY.fraction * output.y.range);
    // output.x.current = output.x.start + (input.mouseX.fraction * output.x.range);
    // output.y.current = output.y.start + (input.mouseY.fraction * output.y.range);
    // output.y.current = output.y.start + (input.mouseY.fraction * output.y.range);
    // output.y.opposite = output.y.end - (input.mouseY.fraction * output.y.range);

}
var updateEachItem = function (){
    Array.prototype.forEach.call(point, function (p){
        var depth = parseFloat(p.dataset.depth);
        var pOutput = {
            x: output.x.current - output.x.current*depth,
            y: output.y.current - output.y.current*depth,
            zIndex: 10000 - 10000*depth,
        };
        p.style.zIndex = pOutput.zIndex.toString();
        p.style.transform = 'translateY('+ ( output.y.current*3 - output.y.current *depth - 270) + 'px)';
        // p.style.transform = 'translateX('+pOutput.x+'px,'+ output.y.current+ 'px)';
        // console.log(output.x.current);
    });
    Array.prototype.forEach.call(parallaxCollection, function (p){
        var depth = parseFloat(p.dataset.depth);
        var pOutput = {
            x: output.x.current - output.x.current*depth,
            y: output.y.current - output.y.current*depth,
            zIndex: 10000 - 10000*depth,
        };
        p.style.zIndex = pOutput.zIndex.toString();
        p.style.transform = 'translateX('+ ( output.y.current*3 - output.y.current *depth) + 'px)';
        // p.style.transform = 'translateX('+pOutput.x+'px,'+ output.y.current+ 'px)';
        // console.log(output.x.current);
    });

    Array.prototype.forEach.call(document.getElementsByTagName("p"), function (p){
        var depth = parseFloat(p.dataset.depth);
        var pOutput = {
            x: output.x.current - output.x.current*depth,
            y: output.y.current - output.y.current*depth,
            zIndex: 10000 - 10000*depth,
        };
        p.style.zIndex = pOutput.zIndex.toString();
        p.style.transform = 'translateX('+ ( -(output.y.current*2 - output.y.current *depth)) + 'px)';
        // p.style.transform = 'translateX('+pOutput.x+'px,'+ output.y.current+ 'px)';
        // console.log(output.x.current);
    });
    var col1 = document.getElementById("col1");
    col1.style.transform = 'skewX('+(output.y.current/8 + 4)  +'deg)';
    // console.log(output.y.current/8);
    var point1 = document.querySelector(".point");
    point1.style.transform = 'translateY('+ (output.y.current*3.5) + 'px)';

    var pum = document.getElementById("vanya");
        pum.style.transform = 'translateY('+ (-( output.y.current*10+ 700)) + 'px)';
        // p.style.transform = 'translateX('+pOutput.x+'px,'+ output.y.current+ 'px)';
        // console.log(output.x.current);


    // pointArray.forEach(function (point, i){
    //     point.style.transform = 'translateX(75px)';
    // } );
// keep the range 0 to 1
//     if (input.mouseX.fraction > 1){ input.mouseX.fraction = 1; }
//     if (input.mouseX.fraction < 0){input.mouseX.fraction = 0; }
//     console.log("output.x.current", output.x.current);
//     console.log("fractionY", input.mouseY.fraction);
}
var handleMouseMove = function (event){

    mouse.x = event.clientX;
    mouse.y = event.clientY;
    updateInputs();
    updateOutputs();
    updateEachItem();
    // console.log('mouse');

    };

var handleResize = function (event){
    input.mouseX.end = window.innerWidth;
    input.mouseX.range = input.mouseX.end - input.mouseX.start;
    input.scrollY.end = document.documentElement.scrollHeight - window.innerHeight;
    input.scrollY.range = input.scrollY.end - input.scrollY.start;

};

var handleScroll = function (event){
updateInputs();
updateOutputs();
updateEachItem();
    // Array.prototype.forEach.call(parallaxCollection, function (p){
    //     // console.log( depth);
    //     var depth = parseFloat(p.dataset.depth);
    //     var pOutput = {
    //         x: output.x.current - output.x.current*depth,
    //         y: output.y.current - output.y.current*depth,
    //         zIndex: 10000 - 10000*depth,
    //     };
    //     p.style.zIndex = pOutput.zIndex.toString();
    //     p.style.transform = 'translate('+pOutput.x+'px,'+output.y.current+ 'px)';
    //
    // });

    // console.log('scrolling');
};
// var handleMouseMove1 = function (event){
//     console.log("mouseX", event.clientX, "mouseY", event.clientY);
// }
// window.addEventListener('mousemove', handleMouseMove);
// window.addEventListener('mousedown', handleMouseMove1);
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleResize);
const observer = new IntersectionObserver(entries => {
    // We will fill in the callback later...
    entries.forEach(entry => {
        const square = entry.target.querySelector('#come');
        const square1 = entry.target.querySelector('#see');

        if (entry.isIntersecting) {
            square.classList.add('anim');
            square1.classList.add('anim');
            return; // if we added the class, exit the function
        }

        // We're not intersecting, so remove the class!
        square.classList.remove('anim');
        square1.classList.remove('anim');
    });
});

// Tell the observer which elements to track
observer.observe(document.querySelector('#s5'));

updateInputs();
updateOutputs();
updateEachItem();

//spag
var spagbox = document.querySelector("#spag-pointer");

spagbox.addEventListener("mouseenter", function () {
    document.getElementById("spag").classList.toggle('hide');

});
spagbox.addEventListener("mouseout", function () {
    document.getElementById("spag").classList.toggle('hide');
});
// butternut
var butbox = document.querySelector("#butternut-pointer");
console.log(butbox);
butbox.addEventListener("mouseenter", function () {
    document.getElementById("butternut").classList.toggle('hide');
});
butbox.addEventListener("mouseout", function () {
    document.getElementById("butternut").classList.toggle('hide');
});
// buttercup
var butcbox = document.querySelector("#buttercup-pointer");
butcbox.addEventListener("mouseenter", function () {
    document.getElementById("buttercup").classList.toggle('hide');
});
butcbox.addEventListener("mouseout", function () {
    document.getElementById("buttercup").classList.toggle('hide');
});
// acorn
var acbox = document.querySelector("#acorn-pointer");
acbox.addEventListener("mouseenter", function () {
    document.getElementById("acorn").classList.toggle('hide');
});
acbox.addEventListener("mouseout", function () {
    document.getElementById("acorn").classList.toggle('hide');
});
//hokkaido
var hokbox = document.querySelector("#hok-pointer");
hokbox.addEventListener("mouseenter", function () {
    document.getElementById("hokkaido").classList.toggle('hide');
});
hokbox.addEventListener("mouseout", function () {
    document.getElementById("hokkaido").classList.toggle('hide');
});
var babybox = document.querySelector("#baby-pointer");
babybox.addEventListener("mouseenter", function () {
    document.getElementById("baby").classList.toggle('hide');
});
babybox.addEventListener("mouseout", function () {
    document.getElementById("baby").classList.toggle('hide');
});
var confbox = document.querySelector("#conf-pointer");
confbox.addEventListener("mouseenter", function () {
    document.getElementById("conf").classList.toggle('hide');
});
confbox.addEventListener("mouseout", function () {
    document.getElementById("conf").classList.toggle('hide');
});
var delbox = document.querySelector("#del-pointer");
delbox.addEventListener("mouseenter", function () {
    document.getElementById("delicata").classList.toggle('hide');
});
delbox.addEventListener("mouseout", function () {
    document.getElementById("delicata").classList.toggle('hide');
});
var musbox = document.querySelector("#muscat-pointer");
musbox.addEventListener("mouseenter", function () {
    document.getElementById("muscat").classList.toggle('hide');
});
musbox.addEventListener("mouseout", function () {
    document.getElementById("muscat").classList.toggle('hide');
});
var pattybox = document.querySelector("#patty-pointer");
pattybox.addEventListener("mouseenter", function () {
    document.getElementById("pattypan").classList.toggle('hide');
});
pattybox.addEventListener("mouseout", function () {
    document.getElementById("pattypan").classList.toggle('hide');
});

console.log(document.documentElement.scrollTop);