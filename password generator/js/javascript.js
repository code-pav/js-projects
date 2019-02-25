let generated = document.getElementById("generated");

function generatePassword(){
	let input = parseInt(document.getElementById("amountOfDigits").value);
	if(Number.isNaN(input)){
		alert("Enter a valid number!")
		return;
	}

	// Be carefull to change this
	// 52 for chars
	// 10*2 for numbers
	if(input < 6 || input > 60){
		alert("Input must be between 6 and 32 numbers")
		return;
	}

	let avaliableCharacters = [];

	// Basic implementation for unique symbols, may be improved.


	// avaliable all numbers double
	for(let i=48; i<58; i++){
		avaliableCharacters.push(String.fromCharCode(i));
		avaliableCharacters.push(String.fromCharCode(i));
	}
	// avaliable symbols;
	// avaliableCharacters.push("$","%","!","_","(",")");
	// add characters
	for(let i=65; i<123; i++ ){
		// skip trash symbols
		if(i>=91 && i<=96){
			continue;
		}
		avaliableCharacters.push(String.fromCharCode(i));
	}
	// console.log(avaliableCharacters);

	let pass = "";
	while(pass.length<input){
		pass+= avaliableCharacters.splice(Math.round(Math.random()*avaliableCharacters.length-1), 1);
	}
	generated.innerHTML = pass;

	document.getElementById("hidden").className = "";
	return pass;
}



function copyToBuffer(){
	//select and copy to buffer
	var range = document.createRange();
	range.selectNodeContents(generated);
	var selection = window.getSelection(); // get Selection object from currently user selected text
    selection.removeAllRanges(); // unselect any user selected text (if any)
    selection.addRange(range);
    
	document.execCommand('copy');
    selection.removeAllRanges(); // undefinednselect any user selected text (if any)
}
