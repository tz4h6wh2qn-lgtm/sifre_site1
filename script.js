// Şifreleme scripti - Ön sürüm
// Türkçe alfabe (29 harf) sırası
const alphabet = ["A","B","C","Ç","D","E","F","G","Ğ","H","I","İ","J","K","L","M","N","O","Ö","P","R","S","Ş","T","U","Ü","V","Y","Z"];

// Varsayılan Sophie Germain asal listesi (ilk 29) - gerektiğinde değiştir
const sg_primes = [2,3,5,11,23,29,41,53,83,89,113,131,173,179,191,233,239,251,281,293,359,419,431,443,491,509,593,641,653];

// Kullanıcının özel atamaları: (senin verdiğin kritik değişikliklerle)
// Kullanıcı daha önce V=593, Y=599, Z=601 demişti; burada V=593 korundu, Y ve Z kullanıcı değerleri ile ayarlandı.
const user_overrides = {"V":593, "Y":599, "Z":601};

// Oluşturulacak alfabe->sayı map
let alphabetMap = {};
for(let i=0;i<alphabet.length;i++){
    const letter = alphabet[i];
    let val = sg_primes[i];
    if(user_overrides.hasOwnProperty(letter)) val = user_overrides[letter];
    alphabetMap[letter] = String(val);
}

// Rakam -> sembol eşleştirmesi (kullanıcı sağladı)
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
    " ":"*"
};

// Helper: normalize Turkish characters (uppercase preserving İ and I)
function upperTurkish(ch){
    // ToUpperCase handles Turkish in modern browsers, but ensure mapping for dotted/dotless I
    if(ch === 'i') return 'İ';
    if(ch === 'ı') return 'I';
    return ch.toUpperCase();
}

// Encryption: input -> encoded string with '-' separator
function encryptText(input){
    let out = [];
    for(let ch of input){
        // handle space
        if(ch === ' '){
            out.push(digitMap[' ']);
            continue;
        }
        // digits
        if(ch >= '0' && ch <= '9'){
            out.push(digitMap[ch]);
            continue;
        }
        // letters -- normalize Turkish uppercase
        let up = upperTurkish(ch);
        if(alphabetMap.hasOwnProperty(up)){
            out.push(alphabetMap[up]);
            continue;
        }
        // if not in mapping, keep char as is
        out.push(ch);
    }
    return out.join('-');
}

// Decrypt (basit): verilen '-' ile ayrılmış kodları alfabenin tersine çevirir veya sembolleri rakama döndürür
function decryptText(code){
    const revAlphabet = {};
    for(let k in alphabetMap){ revAlphabet[alphabetMap[k]] = k; }
    // reverse digits map
    const revDigits = {};
    for(let k in digitMap){ revDigits[digitMap[k]] = k; }

    const parts = code.split('-');
    let out = '';
    for(let p of parts){
        if(revAlphabet.hasOwnProperty(p)){
            out += revAlphabet[p];
        } else if(revDigits.hasOwnProperty(p)){
            out += revDigits[p];
        } else {
            // unknown token: append as-is (or with space)
            out += p;
        }
    }
    return out;
}

// Wire UI
document.addEventListener('DOMContentLoaded', function(){
    const inp = document.getElementById('input');
    const out = document.getElementById('output');
    const btnE = document.getElementById('btn-encrypt');
    const btnD = document.getElementById('btn-decrypt');
    const btnCopy = document.getElementById('btn-copy');

    btnE.addEventListener('click', function(){ out.value = encryptText(inp.value); });
    btnD.addEventListener('click', function(){ out.value = decryptText(inp.value); });
    btnCopy.addEventListener('click', function(){
        out.select();
        document.execCommand('copy');
        alert('Kopyalandı!');
    });
});
