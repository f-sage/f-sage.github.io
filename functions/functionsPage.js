const collapsibles = document.getElementsByClassName("collapsible");

for (let i = 0; i < collapsibles.length; i++) {
    collapsibles[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}


const input=document.getElementById("input");
const answerPhi=document.getElementById("answerPhi");
const answerL=document.getElementById("answerL");
const button=document.getElementById("button");
const answers=document.getElementById("answers");
answers.style.visibility="hidden";

button.onclick=function(){
    if(input.value<1) return;

    CalculatePhi();
    CalculateExplainL();
    DisplayAnswers();

}

input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode == 13) {
        // Trigger the button element with a click
        button.onclick(undefined);
    }
});

function CalculatePhi(){
    let number=input.value;

    let phi="φ("+number+") = "+EulerPhi(number);

    answerPhi.innerHTML=phi;

}

function CalculateExplainL(){
    let number=input.value;
    let whyL=document.getElementById("whyL");

    let L=EulerL(number);
    let stringL="L("+number+") = "+L;
    let primeFactorsArray=GetPrimeFactors(number);

    let primeFactorsString=ToStringWithCommas(primeFactorsArray);

    let prod=1;
    for(let i=0; i<primeFactorsArray.length;++i){
        --primeFactorsArray[i];
        prod*=primeFactorsArray[i];
    }
    let primeFactorsDecreasedString=ToStringWithCommas(primeFactorsArray);

    let gcd=ArrayGCD(primeFactorsArray);

    let textArray=[];
    textArray.push(`Prime factors of ${number}: ${primeFactorsString};`);
    textArray.push(`Prime factors decreased by 1: ${primeFactorsDecreasedString};`);
    textArray.push(`Their product is ${prod};`);
    textArray.push(`For an array of prime factors each decreased by 1, the GCD is ${gcd};`);
    textArray.push(`Result: ${prod}/${gcd} = ${L}.`);


    answerL.innerHTML=stringL;
    whyL.innerHTML=ParagraphsArrayToInnerHTML(textArray, "whyPar");

}

function DisplayAnswers(){
    answers.style.visibility="initial";
}


function ToParagraph(string, parClass){
    let cl=parClass==undefined? "":'class="'+parClass+'"';
    return "<p "+cl+">" + string + "</p>";
}

function ParagraphsArrayToInnerHTML(array, parsClass){
    let html="";
    for(let i=0;i<array.length;++i){
        html+=ToParagraph(array[i], parsClass);
    }

    return html;
}

function ToStringWithCommas(array){

    let toleratedLength=8;

    let string="";

    if(array.length<=toleratedLength){
        for (let i=0;i<array.length-1;++i){
            string+=array[i]+", "
        }
    }
    else{
        //first 3 last 2+1
        for(let i=0; i<3;++i){
            string+=array[i]+", "
        }
        string+="... , "
        string+=array[array.length-3]+", "+array[array.length-2]+", ";
    }

    string+=array[array.length-1];

    return string;
}

