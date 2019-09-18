window.onload = function makeList() {
    // Establish the array which acts as a data source for the list
    let listData = wordObjs[5],
    // Make a container element for the list
    listContainer = document.createElement('div'),
    
    // Make the list
    listElement = document.createElement('ul'),
    // Set up a loop that goes through the items in listItems one at a time
    numberOfListItems = listData.length,
    listItem,
    i;

    // Establish the array which acts as a data source for the list
    let listElement2 = document.createElement('ul');
    
    listElement2.className = "listElement2 listcol";
    listElement.className = "listElement listcol";
    
    listContainer.className = "wordList";
    
    
//    console.log(listData);
    // Add it to the page

    
//    listElement.appendChild(listItem);

    for (i = 0; i < numberOfListItems; ++i) {
        // create an item for each one
        listItemLink = document.createElement('a');
        listItem = document.createElement('li');
        listItem.addEventListener('click', function(){
        console.log("Child clicked");
      });
        listItem.className = "WordItem clickable";
        
        const clip_name = '../../assets/word_assets/word_audio/' + listData[i] + '.mp3'
        
        
        listItem.onmouseover = function(){playClip(clip_name);};
        listItem.onmouseout = function(){stopClip(clip_name);};
        
        
        imageItem = document.createElement('img');
        


        // Add the item text
        imageItem.src = '../../assets/word_assets/word_art/5/' + listData[i].word + '.png';
        listItem.innerHTML = '<h2>' + listData[i].word + '</h2>';
            imageItem.onclick = function(){console.log("0");}
        
        listItem.appendChild(imageItem);
        
        
        
        // Add listItem to the listElement
        if (listData[i].learned) {
            
            listElement.innerHTML += listItem.outerHTML;
        } else {
            
            listItemLink.href = "../quiz/quiz.html";
            listItemLink.innerHTML += listItem.outerHTML;
            listElement2.innerHTML += listItemLink.outerHTML;
        }
    }
    document.getElementsByTagName('body')[0].appendChild(listContainer);
//    listContainer.appendChild(listElement);
//    listContainer.appendChild(listElement2);
    
    listContainer.innerHTML += listElement.outerHTML + listElement2.outerHTML;
}


function playClip(clip_name) {
    if (playing) {return;}
  if (navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 7")!=-1) || (navigator.appVersion.indexOf("MSIE 8")!=-1)) {
    if (document.all) {
      document.all.sound.src = "click.mp3";
    }
  }
  else {
    {
    var audio = document.getElementById("word_audio");
    
    
        
    if (audio == null ) {
        return;
    }
    
    audio.src = clip_name;
    const playPromise = audio.play();
    if (playPromise !== null){
      playPromise.catch(() => { console.log("Caugth"); })
      console.log("User needs to click on page first");
    }
    }
  }
    playing = true;
    console.log("playing=" + playing);
}

function stopClip(clip_name) {
  var audio = document.getElementById("word_audio");
    if (audio == null) {
        return;
    }
  audio.pause();
  audio.currentTime = 0;
    playing = false;
    console.log("playing=" + playing);
}
