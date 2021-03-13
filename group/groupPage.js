//region Elements

const button = document.querySelector('button');
const input = document.getElementById("input");
const table = document.getElementById('table');
let currentFormat=GetFormat();

window.addEventListener('resize', FitTable);

table.style.visibility = "hidden";


button.onclick = function() {
  if(input.value==="") return;
  group=new Group(input.value);
  FormTable();
};

input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.key == 13) {
  // Trigger the button element with a click
    button.onclick();
  }
});

//endregion

//region Helper functions for determining the table's view

function  FitTable(group){
	if(table.style.visibility === "hidden") return;
	console.log(currentFormat+" vs. "+GetFormat());

	//if(currentFormat!=GetFormat())
	{
		console.log("Re-fitting the table...")
		FormTable(group);
	}
}

function GetFormat(){
	if(window.innerWidth<=600) return "vertical";
	else return "horizontal";
}
//endregion

//region Table drawing functions

function FormTable(){
	table.style.visibility = "initial";
	table.innerHTML='';
	
	currentFormat=GetFormat();
	if(currentFormat==="vertical") VerticalTable(group);
	else HorizontalTable(group);
}

function HorizontalTable(){
	let elems=group.elems;
	//let columns = 20;
	let columns=Math.ceil((window.innerWidth/2-140)/50);
	let rows=Math.ceil(elems.length/(columns-1));
	console.log("cols="+columns+", rows="+rows);

	let i;
	//столько раз сколько есть rows надо вывести строку с элементами 
	//потом с ордерами и потом с инверсами
	for(i=0; i<rows; ++i){
		let tr = table.insertRow();
		tr.insertCell().innerHTML="Element";
		let j;
		for(j=0; j<columns-1&&(i*(columns-1)+j)<elems.length;++j){
		//console.log("cols="+columns+", rows="+rows+", result="+(i*(columns-1)+j));
		tr.insertCell().innerHTML=elems[i*(columns-1)+j].elem;
		}
		tr = table.insertRow();
		tr.insertCell().innerHTML="Order";
		
		for(j=0; j<columns-1&&(i*(columns-1)+j)<elems.length;++j){
		tr.insertCell().innerHTML=elems[i*(columns-1)+j].power;
		}
		 tr = table.insertRow();
		tr.insertCell().innerHTML="Inverse";
		
		for(j=0; j<columns-1&&(i*(columns-1)+j)<elems.length;++j){
		tr.insertCell().innerHTML=elems[i*(columns-1)+j].inverse;
		}
		
		if(i!==rows-1) {
			tr=table.insertRow();
			}
	}
}

function VerticalTable(){
	let elems=group.elems;
	let j=elems.length;
	//элемент ордер инверс и так для всех
	let tr = table.insertRow();
	tr.insertCell().innerHTML="Element";
	tr.insertCell().innerHTML="Order";
	tr.insertCell().innerHTML="Inverse";
	for (let i = 0; i < j; i++) {
	tr = table.insertRow();
    tr.insertCell().innerHTML=elems[i].elem;
    tr.insertCell().innerHTML=elems[i].power;
    tr.insertCell().innerHTML=elems[i].inverse;
	}
}
//endregion



