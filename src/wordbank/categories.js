// Creates category buttons 
window.onload = function makeButtons() {
    let categoryList = categories;
    console.log(categoryList.length);
    var numberOfItems = categoryList.length,
    i;
    //Setup div to hold the buttons
    listContainer = document.createElement('div');

    listContainer.className = "tab";
    document.getElementsByTagName('body')[0].appendChild(listContainer);

    for(i = 1; i <= 18; i++) {
        // create a button for each category in the list
        listItem = document.createElement('button');
        listItem.className = "tablinks clickable";
        listItem.id = i;
        //onclick function used to populate words page
        listItem.onclick = function(){categoryClick(this.id)};

        // Add audio mouse-over functionality to listItem
        const clip_name = '../../assets/category_assets/category_audio/' + categoryList[i] + '.mp3';   
        console.log(clip_name);
        listItem.onmouseover = function(){playClip(clip_name);};
        listItem.onmouseout = function(){stopClip(clip_name);};

        //create image element for each button
        imageItem = document.createElement('img');
        imageItem.src = '../../assets/category_assets/' + categoryList[i].toLowerCase() + '.png';
        listItem.innerHTML = categoryList[i];
        listItem.appendChild(imageItem);
        listContainer.appendChild(listItem);
    }
}
function playClip(clip_name) {
    if (navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 7")!=-1) || (navigator.appVersion.indexOf("MSIE 8")!=-1)) {
        if (document.all) {
            document.all.sound.src = "click.mp3";
        }
    } else {
        var audio = document.getElementById("category_audio");
        audio.src = clip_name;
        const playPromise = audio.play();
        if (playPromise !== null){
            playPromise.catch(() => { console.log("Caught: playPromise !== null"); })
        }
    }
}

function stopClip(clip_name) {
    var audio = document.getElementById("category_audio");
    audio.pause();
    audio.currentTime = 0;
}

/* Function that is called when any of the category buttons are selected on the wordbank.html page*/
/* Category ID number is stored and words.html is populated based on this ID selected */
function categoryClick(clicked_id) {
    sessionStorage.setItem("category", clicked_id);
    location.href = '../wordbank/words.html';
}
