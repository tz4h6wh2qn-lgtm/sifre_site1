function encryptText(input){
    let out = [];
    for(let ch of input){
        if(ch === ' '){
            out.push(digitMap[' ']);
            continue;
        }
        if(ch >= '0' && ch <= '9'){
            out.push(digitMap[ch]);
            continue;
        }

        let up = upperTurkish(ch);
        if(alphabetMap.hasOwnProperty(up)){
            out.push(alphabetMap[up]);
            continue;
        }
        out.push(ch);
    }

    // BURASI DEĞİŞTİ: "-" yerine "*"
    return out.join('*');
}

