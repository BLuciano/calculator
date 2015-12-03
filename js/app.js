(function(){
	var display = document.getElementById("display");
	var temp="", result = 0, operand, num2;
	var onFirst = true, error = false;

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
		//Place All Clear function first in order to clear out of errors
		if(input === "AC"){
			onFirst = true; 
			error = false;
			document.getElementById("decimal").disabled = false;
			display.innerHTML = 0;
			temp= "";
			operand = "";
			num2 = "";
			result = 0;
		}

		/*once an error occur only the AC function will work, 
		below code won't get executed*/
		if(error) return;

		if(input === "CE"){
			temp = "";
			display.innerHTML = "0";
		}

		if(input >= 0 && input < 10){
			temp+= input;
			display.innerHTML = temp;
		}

		if(input === '.'){
			temp+= input;
			display.innerHTML = temp;
			document.getElementById("decimal").disabled = true;
		}

		if(input === '+' || input === '-' || input === '/' || input === 'X' || input === "="){
			if(temp === ""){
				operand = input;
				//return;
			} 
			else if(onFirst){
				result = temp;
				operand = input;
				temp = "";
				onFirst = false;
			} else {
				result = doMath(result, temp, operand);
				temp = "";
				operand = input;
			}
			if(isNaN(result) || result === undefined || result === Infinity){
				error = true;
				display.innerHTML = "Error!";
				return;
			}
			
			display.innerHTML = result;	
			document.getElementById("decimal").disabled = false;

		}
	} // End of readInput()

	//Calculates the user data depending on the operation choice
	function doMath(num1, num2, operation){
		num1 = parseFloat(num1);
		num2 = parseFloat(num2);
		switch(operation){
			case '+':
				return num1 + num2;
				break;
			case '-':
				return num1 - num2;
				break;
			case '/':
				return num1 / num2;
				break;
			case 'X':
				return num1 * num2;
				break;
		}
	}//End of doMath()
}());