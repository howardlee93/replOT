function isValid(stale, latest, otjson) {
    // this is the part you will write!
    otjson = JSON.parse(otjson);
    let strCopy = stale;
    let posTrack = 0;
    let res;

    for (let i = 0; i < otjson.length; i++){
        let opInfo = otjson[i]; // op, 
        [strCopy, posTrack] = transform(opInfo, strCopy, posTrack);
        // if (!posTrack || !strCopy) res = false
    }
    res = strCopy === latest && posTrack <= latest.length;
    console.log (res, strCopy, posTrack); 
    // return res;
}


const transform = (operation, str, pos)=>{

    if (operation === []) return str, pos;
    let {op} = operation;
    
    switch (op) {
        case 'skip':
            pos = skip(str, pos, operation.count)
        break;
        case 'delete':
            [str, pos] = remove(str, pos, operation.count);
            break;
        case 'insert':
            // console.log(operation.chars)
           [str, pos] = insert(str, pos, operation.chars);
            break;
        default:
            break;
    }

    return [str, pos]

}


const skip = (old, oldPos, newPos) =>{
    // if (newPos + oldPos >= old.length) return [null];
    return oldPos + newPos;
};

const remove = (oldStr, oldPos, toBeDeleted)=>{ //input str, input string pos, count of char to be deleted

    // if (oldStr.length < oldPos + toBeDeleted) return [null, null];
    let newStr = oldStr.substring(0, oldPos) + oldStr.substring(oldPos+ toBeDeleted, oldStr.length);
    return [newStr, oldPos];
}

const insert = (oldStr, oldPos, toBeAdded)=>{ // input str, input string pos, chars to be added
    let newStr = oldStr.substring(0,oldPos) + toBeAdded + oldStr.substring(oldPos);
    return [newStr, oldPos + toBeAdded.length];
}


module.exports = {isValid}
