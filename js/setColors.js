// ************ Event target *********************
var boxes = document.getElementsByClassName("cell");
var colors = randomColors(boxes.length);
var luckyColor = pickColor();
var lucky = document.querySelector("#selected");
var stop = document.querySelector("button");
var message = document.querySelector("#message");
var header = document.querySelector("h1");
var resetButton =  document.querySelector("#reset");
var level = document.querySelector("select");
var container = document.querySelector("#container");
var generateBtn = document.querySelector("#generate");
var resetLevel;
var tries = 0; // no. of tries untill user guessed the color



// ********** Event Listeners *****************

//generate cells
generateBtn.addEventListener("click",function(){
		var boxesOnRow = 8;
		generateBoxes(boxesOnRow);
});

// user select the level -> easy / medium / hard
level.addEventListener("change",function(){
	var select = this.options[this.selectedIndex].value;
	generateBtn.disabled = true;
	// h1.textContent += selected;

	switch(select){

		case "Easy":
			resetLevel = Math.floor(boxes.length/3);
			setLevel(resetLevel);
			break;

		case "Medium":
			resetLevel = Math.floor(boxes.length*2/3)
			setLevel(resetLevel);
			break;

		case "Hard":
			resetLevel = boxes.length;
			setLevel(resetLevel);
			break;
	}
	guessTheColor();
})

// user reset the game
resetButton.addEventListener("click",function(){
	generateBtn.disabled = false;
	tries = 0;
		//generate new colors
	colors = randomColors(resetLevel);
	luckyColor = pickColor();
	header.style.backgroundImage = "url('/images/pexels-photo-1150626.png')";
	//pick new random color
	lucky.textContent = luckyColor;
	message.classList.remove("zoom");
	message.textContent = ""; 
	resetButton.textContent = "New round";
	// change boxes color
	for(var i = 0; i < colors.length; i++){
		boxes[i].style.border = "1px solid white";
		boxes[i].style.background = colors[i];
	}
})


// lucky.textContent = luckyColor;	
function guessTheColor(){
	for(var i = 0; i < boxes.length; i++){
	boxes[i].style.background = colors[i];
	// boxes[i].textContent = Math.floor((Math.random()*256));
	console.log(boxes[i].textContent+ " " +luckyColor);
	// math.floor(x) returns the largest integer less than or equal to a given number.
	// math.random() returns a random number in inverval [0,1) 
	boxes[i].addEventListener("click",function(){
		tries++; 
		if(this.style.background !== luckyColor) // user select wrong color
		{
			this.style.background = "black";
			this.style.border = "1px solid red";
			message.textContent = "Try again!";
		} else { // user select corect color
			message.textContent = "Congrats, that's right!";
			message.style.color = luckyColor;
			message.classList.add("zoom");

			resetButton.textContent = "Play again?"
			header.style.background = luckyColor;
			setAllSameColor(luckyColor);
		}
	})
}
}


function generateBoxes(noOfBoxes){
	var cell = document.createElement("div");
	while(noOfBoxes > 0){
		cell.setAttribute("class","cell");
		container.appendChild(cell);
		cell = document.createElement("div");
		noOfBoxes--;
	}
}

function setLevel(noOfBoxes){
	message.textContent = "";
	colors = randomColors(noOfBoxes);
	luckyColor = pickColor();
	lucky.textContent = luckyColor;
	colorTheBoxes(boxes.length);
	// for(var i = 0; i < boxes.length; i++){
	// 	if(colors[i]){
	// 		boxes[i].style.border = "1px solid white";
	// 		boxes[i].style.display = "inline-block";
	// 		boxes[i].style.background = colors[i];
	// 	}else{
	// 		boxes[i].style.display = "none";
	// 	}
	// }
}

function colorTheBoxes(num){
	for(var i = 0; i <num; i++){
		if(colors[i]){
			boxes[i].style.border = "1px solid white";
			boxes[i].style.display = "inline-block";
			boxes[i].style.background = colors[i];
		}else{
			boxes[i].style.display = "none";
		}
	}
}
function pickColor(){
		var	picked = Math.floor(Math.random()*colors.length); 
		return colors[picked];
}

function setAllSameColor(color){
	for(var i = 0; i < boxes.length; i++){
		boxes[i].style.background = color;
	}
}

// create an array of random numbers
function randomColors(num){
	var arr = []
	for(var i = 0; i < num; i++){
		var generatedColor = generateColors();
		arr.push(generatedColor);
	}
	return arr;
}

function generateColors(){
		var red = Math.floor((Math.random()*256));
		var green = Math.floor((Math.random()*256));
		var blue = Math.floor((Math.random()*256));

		return "rgb(" + red + ", " + green + ", " + blue + ")" ;
}
