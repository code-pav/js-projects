let task = [];
let parent = document.getElementById("holder");
let amount = 0;
let currentState = "all";
function process (event,value) {
	if(event.key!=null&&event.key=="Enter"){
		addNewTask(value);
	}
}


function processFromInput(){
	addNewTask(document.getElementById("dataHolder").value);
}


function addNewTask (data) {
	if(data==""||data==null){
		return;
	}
	let outerElem = document.createElement("div");
	outerElem.className = "task";
	let textElem = document.createElement("p");
	textElem.innerHTML = data;
	textElem.addEventListener("click", addStrike);
	let buttonElem = document.createElement("button");
	buttonElem.innerHTML = "X";
	buttonElem.addEventListener("click", removeItem);
	outerElem.appendChild(textElem);
	outerElem.appendChild(buttonElem);

	task.push(outerElem);

	amount++;

	parent.appendChild(outerElem);

	document.getElementById("dataHolder").value = "";

	
	hideBottomPart();
	updateSize();
}

function hideBottomPart(){
	if(task.length>0){
		document.getElementsByClassName("footer")[0].className = "footer";
	}else{
		document.getElementsByClassName("footer")[0].className = "footer hidden";
	}
}
function updateSize(){
	document.getElementById("item-counter").innerHTML = `${amount} items`;
}
function addStrike (event) {
	let temp = event.srcElement.className;
	if(temp == ""){
		event.srcElement.className = "strike"; 
		amount--;
	}else{
		event.srcElement.className = "";
		amount++;
	}
	hideBottomPart();
	display(currentState);
	updateSize();
}

function removeItem (event) {
	let index;
	for(let i=0; i<task.length; i++){
		if(task[i] == event.srcElement.parentElement){
			index = i;
		}
	}
	
	if(event.srcElement.parentElement.childNodes[0].className!="strike"){
		amount--;
	}
	parent.removeChild(task.splice(index, 1)[0]);
	hideBottomPart()
	updateSize();
}

function clearCompleted(){
	task = task.filter(el => el.childNodes[0].className != "strike");
	recreate(task);
	hideBottomPart()
}



function recreate(arr){
	parent.innerHTML = "";
	arr.map(el => parent.appendChild(el));
}

function display(str){
	let el = document.getElementById(str);
	// if(el.className == ""){
	document.getElementById("completed").className ="";
	document.getElementById("active").className ="";
	document.getElementById("all").className ="";
		el.className = "choosen";
		switch (str) {
			case "all":
				currentState = "all";
				recreate(task);
				break;
			case "completed":
				currentState = "completed";
				recreate(task.filter(el => el.childNodes[0].className == "strike"));
				break;
			case "active":
				currentState = "active";
				recreate(task.filter(el => el.childNodes[0].className != "strike"));
				break;

		}
}