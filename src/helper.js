export function checkHeading (str){
    let headingRegex = /^(\*)(\*)(.*)\*$/;
    let isHeading = headingRegex.test(str);
    return isHeading;

}

export function replaceHeading (str){
    let regex =/\*+/g
return str.replace(regex,"");
}