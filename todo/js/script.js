let task = [];
let parent = document.getElementById("holder");

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


	parent.appendChild(outerElem);

	document.getElementById("dataHolder").value = "";
	updateSize();
}
function updateSize(){
	document.getElementById("item-counter").innerHTML = `${task.length} items`;
	
	if(task.length>0){
		document.getElementsByClassName("footer")[0].className = "footer";
	}else{
		document.getElementsByClassName("footer")[0].className = "footer hidden";
	}
}
function addStrike (event) {
	let temp = event.srcElement.className;
	if(temp == ""){
		event.srcElement.className = "strike"; 
	}else{
		event.srcElement.className = "";
	}
}

function removeItem (event) {
	let index;
	for(let i=0; i<task.length; i++){
		if(task[i] == event.srcElement.parentElement){
			index = i;
		}
	}
	parent.removeChild(task.splice(index, 1)[0]);

	updateSize();
}