// Türkçe alfabe
const alphabet = ["A","B","C","Ç","D","E","F","G","Ğ","H","I","İ","J","K","L","M","N","O","Ö","P","R","S","Ş","T","U","Ü","V","Y","Z"];

// Sophie Germain asal listesi (ilk 29)
const sg_primes = [2,3,5,11,23,29,41,53,83,89,113,131,173,179,191,233,239,251,281,293,359,419,431,443,491,509,593,599,601];

// Alfabe -> sayı eşleştirme
let alphabetMap = {};
for(let i=0;i<alphabet.length;i++){
    alphabetMap[alphabet[i]] = String(sg_primes[i]);
}

// Rakam yerine geçen semboller
const digitMap = {
    "0":"x",
    "1":"y",
    "2":"z",
    "3":"Ɣ",
    "4":"ξ",
    "5":"σ",
    "6":"ε",
    "7":"π",
    "8":"θ",
    "9":"α",
    " ":"*" // boşluk
};

// türkçe uppercase düzeltme
function upperTurkish(ch){
    if(ch === 'i') return 'İ';
    if(ch === 'ı') return 'I';
    return ch.toUpperCase();
}

// ŞİFRELEME
function encryptText(input){
    let out = [];
    for(let ch of input){

        // boşluk -> *
        if(ch === " "){
            out.push("*");
            continue;
        }

        // rakam -> sembol
        if(ch >= "0" && ch <= "9"){
            out.push(digitMap[ch]);
            continue;
        }

        // harf -> sayı
        let up = upperTurkish(ch);
        if(alphabetMap.hasOwnProperty(up)){
            out.push(alphabetMap[up]);
            continue;
        }

        // bilinmiyorsa aynen ekle
        out.push(ch);
    }

    // AYIRICI = *
    return out.join("*");
}

// ÇÖZME
function decryptText(code){
    // sayı -> harf ters eşleştirme
    const revAlphabet = {};
    for(let k in alphabetMap){
        revAlphabet[alphabetMap[k]] = k;
    }

    // sembol -> rakam ters eşleştirme
    const revDigits = {};
    for(let k in digitMap){
        revDigits[digitMap[k]] = k;
    }

    let parts = code.split("*");
    let out = "";

    for(let p of parts){

        if(revAlphabet.hasOwnProperty(p)){
            out += revAlphabet[p];
            continue;
        }

        if(revDigits.hasOwnProperty(p)){
            out += revDigits[p];
            continue;
        }

        // bilinmiyorsa direkt
        out += p;
    }

    return out;
}

// BUTONLAR
document.addEventListener("DOMContentLoaded", function(){

    const inp = document.getElementById("input");
    const out = document.getElementById("output");
    const btnE = document.getElementById("btn-encrypt");
    const btnD = document.getElementById("btn-decrypt");
    const btnCopy = document.getElementById("btn-copy");

    btnE.addEventListener("click", function(){
        out.value = encryptText(inp.value);
    });

    btnD.addEventListener("click", function(){
        out.value = decryptText(inp.value);
    });

    btnCopy.addEventListener("click", function(){
        out.select();
        document.execCommand("copy");
        alert("Kopyalandı!");
    });
});


