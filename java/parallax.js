//html setup
var pupilsHTMLCollection = document.getElementsByClassName('pupil');
var pupilsArray = Array.from(pupilsHTMLCollection);
// console.log('pupilsArray',pupilsArray)

//input setup
var input = {
	mouseX: {
		start: 0,
		end: window.innerWidth,
		current: 0,
	},
	mouseY: {
		start: 0,
		end: window.innerHeight,
		current: 0,
	}
};

input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

//output setup
var output = {
	x: {
		start: -35,
		end: 35,
		current: 0,
	},
	y: {
		start: -35,
		end: 35,
		current: 0,
	}
}
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

//[2]keeps track of the mouse movement
var handleMouseMove = function (event) {
	//mouseX
	input.mouseX.current = event.clientX;
	input.mouseX.fraction= (input.mouseX.current - input.mouseX.start) / input.mouseX.range;

	//mouseY
	input.mouseY.current = event.clientY;
	input.mouseY.fraction= (input.mouseY.current - input.mouseY.start) / input.mouseY.range;

	//outputX
		output.x.current = output.x.start + (input.mouseX.fraction * output.x.range);
		//to make the pupils follow the inverse direction do next line ,,same for output y
			//output.x.current = output.x.end - (input.mouseX.fraction * output.x.range);
		//to make googly eyes, do line next
			output.x.opposite = output.x.end - (input.mouseX.fraction * output.x.range);


	// outputY
		output.y.current = output.y.start + (input.mouseY.fraction * output.y.range);
		//googly eyes
			output.y.opposite = output.y.end - (input.mouseY.fraction * output.y.range);


	//APPLY OUTPUT TO HTML
	pupilsArray.forEach(function (pupil, k) {
		pupil.style.transform='translate('+output.x.current+'px,'+output.y.current+'px)';

		//making googly eyes ,,,do this
		if(k===0) {
			pupil.style.transform='translate('+output.x.opposite+'px,'+output.y.opposite+'px)';
		}else {
			pupil.style.transform='translate('+output.x.current+'px,'+output.y.current+'px)';
		}
		
	});

	//[3]fraction displayed will only be between 0 and 1
	/*if (input.mouseX.fraction > 1) {
		input.mouseX.fraction = 1;
	}
	if (input.mouseX.fraction < 0) {
		input.mouseX.fraction = 0;
	}*/

	//console.log('fraction X', input.mouseX.fraction)
	//console.log('fraction Y', input.mouseY.fraction)

	//console.log('output.x.current',output.x.current)

}
//[1]makes sure the fraction value is between 0 and 1 whenever you resize the window page
var handleResize = function () {
	//mouseX
	input.mouseX.end = window.innerWidth;
	input.mouseX.range = input.mouseX.end - input.mouseX.start;

	//mouseY
	input.mouseY.end = window.innerHeight;
	input.mouseY.range = input.mouseY.end - input.mouseY.start;
}
//[2]
window.addEventListener('mousemove', handleMouseMove)
//[1]
window.addEventListener('resize', handleResize)