function playClip(clip_name) {
    if (navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 7")!=-1) || (navigator.appVersion.indexOf("MSIE 8")!=-1)) {
        
        if (document.all) {
            document.all.sound.src = "click.mp3";
        }
        
    } else {
        
        var audio = document.getElementById(clip_name);
        console.log(audio);
        const playPromise = audio.play();
        
        if (playPromise !== null){
            playPromise.catch(() => { audio.play(); })
            console.log("User needs to click on page first");
        }
        
    }
}
  
function stopClip(clip_name) {
    var audio = document.getElementById(clip_name);
    audio.pause();
    audio.currentTime = 0;
}