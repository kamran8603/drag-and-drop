var containerEl=document.getElementById("container");
var randimageEl=document.getElementById("randimage");

var images=new Array();
function loadimages(){
    // images.length=0;
    let img=new Array();
    img[0]="https://cdn-icons-png.flaticon.com/128/5904/5904517.png";
    img[1]="https://cdn-icons-png.flaticon.com/128/5904/5904316.png";
    img[2]="https://cdn-icons-png.flaticon.com/128/5904/5904511.png";
    img[3]="https://cdn-icons-png.flaticon.com/128/5904/5904398.png";
    img[4]="https://cdn-icons-png.flaticon.com/128/5904/5904476.png";
    for(let i=0;i<5;i++){
        let t=document.createElement("img");
        t.setAttribute("data-ns-test",`img${i+1}`);
        //console.log(att);
        t.src=img[i];
        t.onclick=(e)=>{clicked(e)}
        images.push(t);
    }
}
loadimages();
window.onload=shuffle(images);
function shuffle(images){
    let r=Math.floor(Math.random()*5);
    let temp=document.createElement('img');
    temp.setAttribute("data-ns-test",images[r].getAttribute("data-ns-test"));
    temp.src=images[r].src;
    temp.onclick=(e)=>{clicked(e)}
    images.push(temp);
    console.log(temp);
    let x=0;
    while(x<6){
        let rand=Math.floor(Math.random()*6);
        let temp=images[rand];
        images[rand]=images[x];
        images[x]=temp;
        x++;
    }
    // console.log(images);
    showimages();
}

function showimages(){
    document.getElementById("randimage").innerHTML="";
    for(let i=0;i<6;i++){
        let d=document.getElementById("randimage");
        d.appendChild(images[i]);
    }
}
let captcha=[];
function resetscreen(){
    shuffle(images);
    for(let i=0;i<6;i++){
        images[i].onclick=(e)=>{clicked(e)}
    }
    captcha.length=0;
    try{document.getElementById("para").remove();}
    catch(e){}
    try{document.getElementById("reset").remove();}
    catch(e){}
    try{document.getElementById("btn").remove();}
    catch(e){}
}
function clicked(ev){
    console.log(ev.target.getAttribute("data-ns-test"));
    captcha.push(ev.target.getAttribute("data-ns-test"));
    ev.target.onclick=()=>{}
    console.log(ev.target);
    if (captcha.length>2){
        try{document.getElementById("para").remove();}
        catch(e){};
        try{document.getElementById("btn").remove();}
        catch(e){}
    }
    if (captcha.length==1){
        let resetEl=document.createElement("button");
        resetEl.id="reset";
        resetEl.innerHTML="Reset";
        resetEl.onclick=()=>{
            resetscreen();
        };
        containerEl.appendChild(resetEl);
    }
    if(captcha.length==2){
        let verifyEl=document.createElement("button");
        verifyEl.id="btn";
        verifyEl.innerHTML='Verify';
        verifyEl.onclick=()=>{
            verifyhuman();
        }
        containerEl.appendChild(verifyEl);
    }      
}
function verifyhuman(){

    if(captcha.length==2 && captcha[0]==captcha[1]){
        let pp=document.createElement("p");
        pp.id="para";
        pp.innerHTML="You are a human. Congratulations!";
        containerEl.appendChild(pp);

    }else{
        let pp=document.createElement("p");
        pp.id="para";
        pp.innerHTML="We can't verify you as a human. You selected the non-identical tiles.";
        containerEl.appendChild(pp);
    }
    document.getElementById('btn').remove();
    console.log(captcha.length);
}