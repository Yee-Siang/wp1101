let answer=""


const genNumber=()=>{
    answer=Math.ceil(100*Math.random());
    return answer
}

const getNumber=()=>{
    return answer
}
export {getNumber,genNumber}