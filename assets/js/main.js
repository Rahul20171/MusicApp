window.addEventListener("load",initEvents);
var input;
var exp;
function initEvents(){
    input = document.querySelector("#box");
    input.setAttribute("readonly",true);
    var num = document.querySelectorAll(".num");
    var oprs = document.querySelectorAll(".opr");
    var calc= document.querySelector(".calc").addEventListener("click",result);
    document.querySelector(".reset").addEventListener("click",clear);
    document.querySelector(".back").addEventListener("click",back);
    for( var i = 0; i < num.length; i++){
        num[i].addEventListener("click",appendNum);
    }
    for( var i = 0; i < oprs.length; i++){
        oprs[i].addEventListener("click",appendOpr);
    }
    
}

function appendNum(){
    var val = this.innerText;
    input.value+=val;
}
function appendOpr(){
    var val = this.innerText;
    // if(input.value[])
    var str = input.value;
    var char = str[str.length-1];
    if(char=='+' || char=='-'||char=='*'||char=='/'){
       
        if(val != char){
            var newStr="";
            for(var j = 0; j < str.length-1;j++){
                 newStr+=str[j];
            }
            newStr+= val;
            input.value = newStr;
        }

    }else{
        input.value+=val;
    }
}

// ----clear----------
function clear(){
    document.getElementById("box").value="";
}
// -------result------------
function result(){
    // -------
    exp = input.value;
    var ans = eval(exp);   // eval function is predfined for evaluate mathemetical expression
    input.value = ans;
}

// ----------back---------
function back(){
    var str = input.value;
    var nstring = "";
    for( var i = 0; i < str.length-1; i++){
        nstring += str[i]; 
    }
    input.value = nstring;
}