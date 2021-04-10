window.addEventListener("load",initEvents);
var audio;
var playbtn;
var stopbtn;
var input;
var current_time;
var total_time;
var frwdbtn;
var helperFrwd;
function initEvents(){
    // initilize Events---------------------
    audio = document.querySelector("#audio_tag");
    playbtn = document.querySelector("#playbtn");
    stopbtn = document.querySelector("#stopbtn");
    frwdbtn = document.querySelector("#frwdbtn");
    backbtn = document.querySelector("#backbtn");
    input = document.querySelector("#range_bar");
    current_time = document.querySelector("#current_time");
    total_time = document.querySelector("#total_time");
    stopbtn.addEventListener('click',stopsong);
    playbtn.addEventListener('click',controlbtn);
    frwdbtn.addEventListener('click',forward);
    backbtn.addEventListener('click',backward);
    playbtn.disabled=true;
    stopbtn.disabled=true;
    backbtn.disabled=true;
    frwdbtn.disabled=true;
    loadsongs();
    loadPlaylist();
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
        add_btn.addEventListener('click',add_to_playList);
        // play_btn.setAttribute('title')
        img.src = obj.song_img;
        h5.innerHTML = obj.song_name;
        add_btn.innerHTML = '<i class="fas fa-plus">';
        play_btn.innerHTML = 'Play';
        // play_btn.id = obj.song_id;
        add_btn.setAttribute('title',obj.song_id);
        play_btn.setAttribute('title',obj.song_id)
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
    var btn_id=this.title;
    var flag = false;
    for(var i = 0; i < songs.length; i++){
        if(btn_id == songs[i].song_id){
            flag = true;
            audio.src = songs[i].song_url;
            helperFrwd = songs[i].song_id;
            helperH();
            break;
        }
    }
    
    if(flag==true){
        audio.play();
        playbtn.innerHTML ='<i class="fas fa-pause">';
        setInterval(function(){
            input.value=(audio.currentTime/audio.duration)*100;
            // total_time.innerHTML = audio.duration;
            // current_time.innerHTML = audio.currentTime;
        },100);
    }

}
// ----------------------

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

var song_obj;
var icon_btn ;
var addedSongId = [];
var add_song_idx = 0;
function add_to_playList(){
    // console.log("function: called");
     var song_id = this.title;
     for(var i = 0; i < songs.length; i++){
         if(song_id == songs[i].song_id){
             song_obj = songs[i];
             
             break;
         }
     }playlist_song.addsong(song_obj.song_id , song_obj.song_name , song_obj.song_url , song_obj.song_img );
     showPlaylist();
    
    // confirm(song_obj.song_name+"is added to your playlist");
}
function showPlaylist(){
    var ul_tag = document.querySelector("#playlist");
    ul_tag.innerHTML="";
    playlist_song.my_play_list.forEach(function(obj){
        var song_img = obj.img;
        var song_name = obj.name;
        var song_id = obj.id;
    var li = document.createElement('li');
    var img_div = document.createElement('div');
    var img = document.createElement('img');
    var h4 = document.createElement('h4');
    icon_btn = document.createElement('button');
    img.src = song_img;
    img_div.className="img-div";
    img_div.appendChild(img);
    icon_btn.className = 'icon';
    icon_btn.innerHTML='<i class="fas fa-trash">';
    icon_btn.addEventListener('click',dlt);
    icon_btn.id = song_id;
    h4.innerHTML = song_name;
    li.appendChild(img_div);
    li.appendChild(h4);
    li.appendChild(icon_btn);

    ul_tag.appendChild(li);
    // console.log("function-called");
    });
   savePlaylist();
}
function dlt(){
    console.log("dlt-function-called");
     var song_id = this.id;
     playlist_song.delete(song_id);
     showPlaylist();
     
 }


// --------------FORWRD-BUTTON----------------------
var j;
function helperH(){
    // console.log(helperFrwd);
    j = helperFrwd-1;
    if(j+1<songs.length){
        j=j+1;
        // console.log(j);
    }else{
        frwdbtn.disabled=true;
    }
}
function forward(){
  console.log("forward")
   for(var i = 0; i < songs.length; i++){
       if(j+1==songs[i].song_id){
        audio.src = songs[i].song_url;
        // songs[i].style.border="1px solid #fff";
        audio.play();
        frwdselfhelp();
        break;
       }
   }
     
}
function frwdselfhelp(){
    if(j+1<songs.length){
        j=j+1;
    }else{
        frwdbtn.disabled=true;
    }
}
// ---------------------FORWRD-BUTTON-WORK-END------------------------


function backward(){
    
    // console.log("backward")
}

function savePlaylist(){
    // console.log("saveplaylist function-called");
    if(window.localStorage){
        var data = JSON.stringify(playlist_song.my_play_list);
        localStorage.setItem('data',data);
    }else{
        alert("Locale Storage Not supported");
    }
}

function loadPlaylist(){
    if(window.localStorage){
         if(localStorage.data){
             var data = localStorage.getItem('data');
             playlist_song.my_play_list = JSON.parse(data);
             showPlaylist();
         }
    }
    else{
        alert("local storage not supported");
    }
}
function seekSong(){
    audio.currentTime = input.value / 100 * audio.duration;
}