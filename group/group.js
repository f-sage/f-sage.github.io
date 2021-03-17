//region Classes
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
            if (GCD(k, this.modulo) === 1) {
                let pow = this.GetPower(k);
                this.elems.push(new GroupMember(k, pow));

                //console.log(JSON.stringify(new GroupMember(k, pow)));
            }
           // console.log("GCD for "+k+" is  "+GCD(k, this.modulo));
        }
        //get maxPower

        let i;
        for(i=1; i<this.elems.length; ++i){
            if(this.elems[i].power>this.maxPower) this.maxPower=this.elems[i].power;
           // console.log(this.maxPower);
        }

        //get inverse elements
        this.elems.forEach(item => this.AssignInverse(item));
        //console.log(this.elems);
    }

    PrintGroup(Print){
        this.elems.forEach(function(item){
            let str="Element " + item.elem + " has power " + item.power+", inverse element "+item.inverse;
            Print(str);
        })}

    GetPower(elem){
        if(elem===1) return 1;
        let i;
        for(i=2;i<this.modulo;++i){
            //	console.log("exp for i="+i+" is"+fastModularExponentiation(elem, i, modulo));
            if(fastModularExponentiation(elem, i, this.modulo)===1) return i;
        }
        return 0;
    }

    AssignInverse(item){
        let maxPow=this.maxPower-1;
       // console.log("elem="+item.elem+", maxPower="+this.maxPower+", modulo="+this.modulo);
        item.inverse =
            fastModularExponentiation(item.elem, maxPow, this.modulo);
    }

    ToString(){
       let string="{";
       for(let i=0;i<this.elems.length-1;++i){
           string+=this.elems[i].elem+", "
       }
       string+=this.elems[this.elems.length-1].elem+"}";
        return string;
    }

}
//endregion

//region Calculating functions for group

function GCD (x, y){
    while(y) {
        let t = y;
        y = x % y;
        x = t;
    }
    return x;
}

function ArrayGCD(array){
    let res=array[0];
    for(let i=1; i<array.length;++i){
        res=GCD(res, array[i]);
    }
    return res;
}

function fastModularExponentiation(a, b, n) {
    a = a % n;
    let result = 1;
    let x = a;

    while(b > 0){
        let leastSignificantBit = b % 2;
        b = Math.floor(b / 2);

        if (leastSignificantBit === 1) {
            result = result * x;
            result = result % n;
        }

        x = x * x;
        x = x % n;
    }
    return result;
}

function EulerPhi(number){
    let result = number;
    for (let i = 2; i * i <= number; ++i)
    if (number % i === 0)
    {
        while (number % i === 0)
            number /= i;
        result -= result / i;
    }
    if (number > 1)
        result -= result / number;
    return result;
}

function BruteforcePhi(number){
    let count = 1;
    for(let i=2; i<number;++i){
        if(GCD(i, number)===1) ++count;
    }
    return count;
}

function EulerL(number){
    let primes=GetPrimeFactors(number);
    let res=1;

    for(let i=0;i<primes.length;++i){
        res*=(--primes[i]);
    }
    res/=ArrayGCD(primes);

    return res;
}

function GetPrimeFactors(n){
    let nums = [];
    while (n % 2 === 0)
    {
        nums.push(2);
        n = n/2;
    }

    for (let i = 3; i <= Math.sqrt(n); i = i + 2)
    {
        while (n % i === 0)
        {
            nums.push(i);
            n = n/i;
        }
    }

    if (n > 2)
        nums.push(n);
    return nums;
}

//endregion