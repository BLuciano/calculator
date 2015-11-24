(function(){
	var display = document.getElementById("display");
	var temp="", operand, num2, result;
	var onFirst = true;

	//Grab all button references and get it's value when clicked.
	var buttons = document.getElementsByTagName("button");
	for(var i = 0; i < buttons.length; i++){
		buttons[i].onclick = function(){
			var input = this.innerHTML;
			readInput(input);
		};
	}

	//Checks the user input.
	function readInput(input){
		if(input >= 0 && input < 10){
			temp+= input;
			display.innerHTML = temp;
		}

		if(input === '.'){
			temp+= input;
			display.innerHTML = temp;
			document.getElementById("decimal").disabled = true;
		}

		if(input === '+' || input === '-' || input === '/' || input === 'X'){
			if(temp === ""){
				operand = input;
				return;
			} 
			if(onFirst){
				result = temp;
				operand = input;
				temp = "";
				onFirst = false;
			} else {
				result = doMath(result, temp, operand);
				temp = "";
				operand = input;
			}
			document.getElementById("decimal").disabled = false;
		}

		if(input === '='){
			result = doMath(result, temp, operand);
			display.innerHTML = result;
		}

		//Calculates the user data depending on the operation choice
		function doMath(num1, num2, operation){
			num1 = parseInt(num1);
			num2 = parseInt(num2);
			switch(operation){
				case '+':
					return num1 + num2;
					break;
				case '-':
					return num1 - num2;
					break;
				case '/':
					if(num2 === 0){
						return "Error!"
					} else {
						return num1 / num2;
					}
					break;
				case 'X':
					return num1 * num2;
					break;
			}
		}
	}

}());