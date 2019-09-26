window.onload = function makeList() {
    // Establish the array which acts as a data source for the list
    var category = sessionStorage.getItem("category");
    console.log(category);
    let listData = wordObjs[category],
    // Make a container element for the list
    listContainerMastered = document.createElement('div'),
    listContainerUnmastered = document.createElement('div'),
    
    // Make the list
    listElementMastered = document.createElement('ul'),
    listElementUnmastered = document.createElement('ul'),
    // Set up a loop that goes through the items in listItems one at a time
    numberOfListItems = listData.length,
    listItem,
    i;
    // Create wordList class elements for both Mastered and Unmastered words
    listContainerMastered.className = "wordList";
    listContainerUnmastered.className = "wordList";
    
    
//    console.log(listData);
    // Add it to the page
    document.getElementById('mastered').appendChild(listContainerMastered);
    document.getElementById('unmastered').appendChild(listContainerUnmastered);

    listContainerMastered.appendChild(listElementMastered);
    listContainerUnmastered.appendChild(listElementUnmastered);

    for (i = 0; i < numberOfListItems; ++i) {
        // create an item for each one
        // each item is created as a button 
        //console.log(listData[i].learned)
        listItem = document.createElement('button');
        const wordName = listData[i].word;
        listItem.className = "WordItem clickable";

        const clip_name = '../../assets/word_assets/word_audio/' + wordName + '.mp3';   
        console.log(clip_name);
        listItem.onmouseover = function(){playClip(clip_name);};
        listItem.onmouseout = function(){stopClip(clip_name);};
        
        imageItem = document.createElement('img');

        // Add the item text
        imageItem.src = '../../assets/word_assets/word_art/' + category + '/' + listData[i].word + '.png';
        listItem.innerHTML = '';
        listItem.innerHTML = '<h2>' + listData[i].word + '</h2>';
        listItem.appendChild(imageItem);

        // Add listItem to the listElement
        if (listData[i].learned == true) {
            listElementMastered.appendChild(listItem);
        } else {
            listElementUnmastered.appendChild(listItem);
        }
    }
}

function playClip(clip_name) {
    if (navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 7")!=-1) || (navigator.appVersion.indexOf("MSIE 8")!=-1)) {
        if (document.all) {
            document.all.sound.src = "click.mp3";
        }
    } else {
        var audio = document.getElementById("word_audio");
        audio.src = clip_name;
        const playPromise = audio.play();
        if (playPromise !== null){
            playPromise.catch(() => { console.log("Caught: playPromise !== null"); })
        }
    }
}

function stopClip(clip_name) {
    var audio = document.getElementById("word_audio");
    audio.pause();
    audio.currentTime = 0;
}