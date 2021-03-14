let button = document.querySelector('button');
const input = document.getElementById("input");
const functionsTable = document.getElementById('functionsTable');
const keyPairsTable = document.getElementById("keyPairsTable");
const groupList = document.getElementById("groupList");
const groupTable= document.getElementById("group");
const keyPairsHead=document.getElementById("keyPairsHead");

functionsTable.style.visibility="hidden";
keyPairsTable.style.visibility="hidden";
groupTable.style.visibility="hidden";
let group;
let encryptionModule;

let width=window.innerWidth;
window.onresize=function  FitTable(){
    if(keyPairsTable.style.visibility === "hidden") return;
    if(width===window.innerWidth) return;
        console.log("Re-fitting the table...")
        FormKeyPairsTable();

}

button.onclick = function() {
    if(input.value==""||input.value<1) return;
    encryptionModule=input.value;
    let groupModule=EulerL(encryptionModule);
    console.log(EulerPhi(groupModule));
    if(groupModule<2||EulerPhi(groupModule)<2||encryptionModule==1){
        NoGroup();
    }
    else{
    group=new Group(groupModule);

    FormFunctionsTable();
    FormGroup();
    FormKeyPairsTable();
    console.log(group.ToString());
}
};

input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        button.onclick();
    }
});

function FormFunctionsTable(){
    functionsTable.style.visibility = "initial";
    functionsTable.innerHTML="";
    //phi(N), L(N), phi(L(N)

    let row = functionsTable.insertRow();
    let eulerPhiN="φ(N)="+EulerPhi(encryptionModule);
    row.insertCell().innerHTML=eulerPhiN;
    let eulerLN="L(N)="+EulerL(encryptionModule);
    row.insertCell().innerHTML=eulerLN;
    let eulerPhiL="φ(L(N))="+EulerPhi(EulerL(encryptionModule));
    row.insertCell().innerHTML=eulerPhiL;

}

function FormKeyPairsTable(){
    keyPairsTable.style.visibility = "initial";
    keyPairsHead.style.visibility="initial";
    keyPairsTable.innerHTML="";
    width=window.innerWidth;

    let head=keyPairsHead;
    head.innerHTML="Possible key pairs:"

    //если инверс равен элементу не добавлять
    //если инверс есть в элементах - тоже не добавлять
    let elems=[];
    let inverseElems=[];

    for(let i=1;i<group.elems.length;++i){
        let elem=group.elems[i];
        if(elem.elem!==elem.inverse&&!elems.includes(elem.inverse)) {
            elems.push(elem.elem);
            inverseElems.push(elem.inverse);
        }
    }
    if(elems.length===0) {head.innerHTML+=" none";
    keyPairsTable.style.visibility="hidden";
    }

    if(window.innerWidth>600) HorizontalKeyPairsTable(elems, inverseElems);
    else VerticalKeyPairsTable(elems, inverseElems);

}

function HorizontalKeyPairsTable(elems, inverseElems) {
    let columns = Math.ceil((window.innerWidth / 2 - 140) / 50);
    let rows = Math.ceil(elems.length / (columns - 1));
    console.log("cols=" + columns + ", rows=" + rows);

    for (let i = 0; i < rows; ++i) {
        let tr = keyPairsTable.insertRow();
        tr.insertCell().innerHTML = "e";
        for (let j = 0; j < columns - 1 && (i * (columns - 1) + j) < elems.length; ++j) {
            tr.insertCell().innerHTML = elems[i * (columns - 1) + j];
        }

        tr = keyPairsTable.insertRow();
        tr.insertCell().innerHTML = "d";
        for (let j = 0; j < columns - 1 && (i * (columns - 1) + j) < elems.length; ++j) {
            tr.insertCell().innerHTML = inverseElems[i * (columns - 1) + j];
        }
        if (i !== rows - 1) {
            tr = keyPairsTable.insertRow();
        }
    }
}

function VerticalKeyPairsTable(elems, inverseElems){
    let tr=keyPairsTable.insertRow();
    tr.insertCell().innerHTML="e";
    tr.insertCell().innerHTML="d";

    for(let i=0;i<elems.length;++i){
    tr=keyPairsTable.insertRow();
    tr.insertCell().innerHTML=elems[i];
    tr.insertCell().innerHTML=inverseElems[i];
    }
}


function FormGroup(){
    groupTable.style.visibility="initial";
    let res="G<sup>*</sup><sub>"+group.elems.length+"</sub>=";

    console.log(group.elems.length);
    res+="{";
    if(group.elems.length<2){
        res+="1}";
    }
    else {

        for (let i = 0; i < group.elems.length - 1; ++i) {
            if (group.elems[i].power > 2) res += "<span class='coloured'>" + group.elems[i].elem + "</span>, ";
            else res += group.elems[i].elem + ", ";
        }
        res += group.elems[group.elems.length - 1].elem + "}";
    }

    groupList.innerHTML=res;
}


function NoGroup(){
    functionsTable.style.visibility="hidden";
    keyPairsTable.style.visibility="hidden";
    keyPairsHead.style.visibility="hidden";
    groupTable.style.visibility="initial";

   groupList.innerHTML="No encryption group can be formed from that number." ;
}