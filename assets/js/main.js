window.addEventListener("load",initEvents);
var audio;
var playbtn;
var stopbtn;
function initEvents(){
    // initilize Events---------------------
    audio = document.querySelector("#audio_tag");
    playbtn = document.querySelector("#playbtn");
    stopbtn = document.querySelector("#stopbtn");
    stopbtn.addEventListener('click',stopsong);
    playbtn.addEventListener('click',controlbtn);
    playbtn.disabled=true;
    stopbtn.disabled=true;
    backbtn.disabled=true;
    frwdbtn.disabled=true;
    loadsongs();
    
}
var play_btn;
var add_btn;
function loadsongs(){
    songs.forEach(function(obj){
        var ul = document.querySelector("#all_songs");
        var li = document.createElement('li');
        var div = document.createElement('div');
        var h5 = document.createElement('h5');
        var img = document.createElement('img');
         add_btn = document.createElement('button');
         play_btn = document.createElement('button');
        div.className = 'img-div';
        add_btn.className = 'btn btn-danger';
        play_btn.className = 'btn btn-danger play_song';
        play_btn.addEventListener('click',playsong);
        // play_btn.setAttribute('title')
        img.src = obj.song_img;
        h5.innerHTML = obj.song_name;
        add_btn.innerHTML = '<i class="fas fa-plus">';
        play_btn.innerHTML = 'Play';
        play_btn.id = obj.song_id;
        div.appendChild(img);
        li.appendChild(div);
        li.appendChild(h5);
        li.appendChild(add_btn);
        li.appendChild(play_btn);
        
        ul.appendChild(li);
    })
}
function playsong(){
    // console.log("song is playing");
    playbtn.disabled=false;
    stopbtn.disabled=false;
    backbtn.disabled=false;
    frwdbtn.disabled=false;
    var btn_id=this.id;
    var flag = false;
    for(var i = 0; i < songs.length; i++){
        if(btn_id == songs[i].song_id){
           flag = true;
           audio.src = songs[i].song_url;

           break;
        }
    }

    if(flag==true){
        audio.play();
        playbtn.innerHTML ='<i class="fas fa-pause">';
    }

}

var ctrlflag=true;
function controlbtn(){
    // work
    if(ctrlflag){
        audio.pause();
        playbtn.innerHTML ='<i class="fas fa-play">';
        ctrlflag=false;
    }
    else{
        audio.play();
        playbtn.innerHTML ='<i class="fas fa-pause">';
        ctrlflag=true;
    }
}

function stopsong(){
    audio.pause();
    audio.currentTime=0;
    playbtn.innerHTML='<i class="fas fa-play">';
    ctrlflag=false;
}