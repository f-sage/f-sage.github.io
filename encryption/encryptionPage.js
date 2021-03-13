let button = document.querySelector('button');
const input = document.getElementById("input");
const functionsTable = document.getElementById('functionsTable');
const keyPairsTable = document.getElementById("keyPairsTable");
const groupList = document.getElementById("groupList");
const keyPairsLabel=document.getElementById("keyPairsLabel");

functionsTable.style.visibility="hidden";
keyPairsTable.style.visibility="hidden";
keyPairsLabel.style.visibility="hidden";
let group;
let encryptionModule;

button.onclick = function() {
    if(input.value=="") return;
    encryptionModule=input.value;
    group=new Group(EulerL(encryptionModule));

    FormFunctionsTable();
    FormGroup();
    FormKeyPairsTable();
    console.log(group.ToString());
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

    console.log(eulerPhiN);
    console.log(eulerLN);
    console.log(eulerPhiL);
}

function FormKeyPairsTable(){
    keyPairsLabel.style.visibility="initial";
    keyPairsTable.style.visibility = "initial";
    keyPairsTable.innerHTML="";
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

    let row=keyPairsTable.insertRow();
    row.insertCell().innerHTML="e";
    for(let i=0;i<elems.length;++i){
        row.insertCell().innerHTML=elems[i];
    }

    row=keyPairsTable.insertRow();
    row.insertCell().innerHTML="d";
    for(let i=0;i<elems.length;++i){
        row.insertCell().innerHTML=inverseElems[i];
    }
}

function FormGroup(){
    let res="G<sup>*</sup><sub>"+group.elems.length+"</sub>=";

    res+="{";
    for(let i=0;i<group.elems.length-1;++i){
        if(group.elems[i].power>2) res+="<span class='coloured'>"+group.elems[i].elem+"</span>, ";
        else res+=group.elems[i].elem+", ";
    }
    res+=group.elems[group.elems.length-1].elem+"}";

    groupList.innerHTML=res;
}


