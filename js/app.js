(function(){
	var display = document.getElementById("display");
	var decimal = document.getElementById("decimal");
	var temp="", result = 0, operand, num2;
	var onFirst = true, error = false, percentage = false;

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
			percentage = false;
			decimal.disabled = false;
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
			decimal.disabled = false;
			percentage= false;
			display.innerHTML = "0";
		}

		if(input >= 0 && input < 10){
			if(temp.toString().length > 10) return;
			temp+= input;
			display.innerHTML = temp;
		}

		if(input === '.'){
			if(temp.toString().length > 10) return;
			temp+= input;
			display.innerHTML = temp;
			decimal.disabled = true;
		}

		if(input === '+' || input === '-' || input === '/' || 
			input === 'X' || input === "=" || input === "%"){
			
			if(temp === ""){
				operand = input;
			} 
			else if(onFirst){
				result = temp;
				operand = input;
				temp = "";
				onFirst = false;
			} else {
				if(input === "%"){
					percentage = true;
				}
				result = doMath(result, temp, operand);
				temp = "";
				operand = input;
			}
			if(isNaN(result) || result === undefined || result === Infinity){
				error = true;
				display.innerHTML = "Error!";
				return;
			}
			result  = parseFloat(result);
			if(result.toString().length > 11) 
			{
				result = result.toPrecision(4);
			}
			display.innerHTML = result;	
			decimal.disabled = false;
			percentage = false;
		}
	} // End of readInput()

	//Calculates the user data depending on the operation choice
	function doMath(num1, num2, operation){
		num1 = parseFloat(num1);
		num2 = parseFloat(num2);

		if(percentage){
			num2 = parseFloat(num1 * (num2 / 100));
		}

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