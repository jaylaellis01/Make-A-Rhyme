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

function switchPoem(poem) {
    document.cookie="currentPoem="+poem+";path=/"
    location.href = '../poem/poem.html';
}

function expandImg(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }