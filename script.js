//======================================//
//Classes
class GroupMember {
  constructor(elem, power) {
    this.elem = elem;
    this.power = power;
	this.inverse=-1;
  }
  
  ToString() {
    return "Group element "+this.elem+" with power "+this.power;
  }
}

class Group{
	constructor(module){
		this.modulo=module;
		this.maxPower=1;
		this.elems=[];
		let k;
		for (k = 1; k < this.modulo; ++k)
        {
			 if (GCD(k, this.modulo) == 1) {
                let pow = GetPower(k, this.modulo);
                this.elems.push(new GroupMember(k, pow));
				
				console.log(JSON.stringify(new GroupMember(k, pow)));
            }
		   console.log("GCD for "+k+" is  "+GCD(k, this.modulo));
		}
		//get maxPower
		
		let i;
		for(i=1; i<this.elems.length; ++i){
			if(this.elems[i].power>this.maxPower) this.maxPower=this.elems[i].power; 
			console.log(this.maxPower);
		}
		
		//get inverse elements
		this.elems.forEach(item => AssignInverse(item, this.maxPower, this.modulo));
		console.log(this.elems);
	}
	
	    PrintGroup(){
		    this.elems.forEach(function(item){
			let str="Element " + item.elem + " has power " + item.power+", inverse element "+item.inverse;
			NextPrint(str);
		})}
		
	
		
}

//======================================//
//Helper functions for determining the table's view

var FitTable=function(group){
	console.log("FitTable called");
	if(table.style.visibility == "hidden") return;	
	console.log(currentFormat+" vs. "+GetFormat());
	
	if(currentFormat!=GetFormat()) 
	{
		console.log("Re-fitting the table...")
		FormTable(group);
	}
}

function GetFormat(){
	if(window.innerWidth<=600) return "vertical";
	else return "horisontal";
}

//================================//
//Initial

let button = document.querySelector('button');
var input = document.getElementById("input");
var table = document.getElementById('table');
var currentFormat=GetFormat();

window.addEventListener('resize', FitTable);

table.style.visibility = "hidden";


button.onclick = function() {
  if(input.value=="") return;
  group=new Group(input.value);
  FormTable();
};

input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
  // Trigger the button element with a click
    button.onclick();
  }
});

//======================================//
//Calculating functions for group 
function GCD (x, y){
	while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

var fastModularExponentiation = function(a, b, n) {
  a = a % n;
  var result = 1;
  var x = a;

  while(b > 0){
    var leastSignificantBit = b % 2;
    b = Math.floor(b / 2);

    if (leastSignificantBit == 1) {
      result = result * x;
      result = result % n;
    }

    x = x * x;
    x = x % n;
  }
  return result;
};

function GetPower(elem, modulo){
		if(elem==1) return 1;
		let i;
		for(i=2;i<modulo;++i){
		//	console.log("exp for i="+i+" is"+fastModularExponentiation(elem, i, modulo));
		if(fastModularExponentiation(elem, i, modulo)==1) return i;
		}
		return 0;
	   }

function AssignInverse(item, maxPower, modulo){
			maxPow=maxPower-1;
			console.log("elem="+item.elem+", maxPower="+maxPower+", modulo="+modulo);
			item.inverse =
				fastModularExponentiation(item.elem, maxPow, modulo);	
		}

//===============================================//
//Table drawing functions

function FormTable(){
	table.style.visibility = "initial";
	table.innerHTML='';
	
	currentFormat=GetFormat();
	if(currentFormat=="vertical") VerticalTable(group);
	else HorisontalTable(group);
}

function HorisontalTable(){
	//сначала элементы потом ордеры потом инверсы
	let elems=group.elems;
	let j=elems.length;

	var tr = table.insertRow();
	tr.insertCell().innerHTML="Element";
	for (var i = 0; i < j; i++) {
    tr.insertCell().innerHTML=elems[i].elem;
	}
	tr = table.insertRow();
	tr.insertCell().innerHTML="Order";
	for (var i = 0; i < j; i++) {
    tr.insertCell().innerHTML=elems[i].power;
	}
	tr = table.insertRow();
	tr.insertCell().innerHTML="Inverse";
	for (var i = 0; i < j; i++) {
    tr.insertCell().innerHTML=elems[i].inverse;
	}
  
}

function VerticalTable(){
	let elems=group.elems;
	let j=elems.length;
	//элемент ордер инверс и так для всех
	var tr = table.insertRow();
	tr.insertCell().innerHTML="Element";
	tr.insertCell().innerHTML="Order";
	tr.insertCell().innerHTML="Inverse";
	for (var i = 0; i < j; i++) {
	tr = table.insertRow();
    tr.insertCell().innerHTML=elems[i].elem;
    tr.insertCell().innerHTML=elems[i].power;
    tr.insertCell().innerHTML=elems[i].inverse;
	}
}
//========================//




