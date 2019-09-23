window.onload = function makeList() {
    
    // Establish the array which acts as a data source for the list
    let listData = wordObjs[5];
    
    // Make a container element for the lists and set HTML class tag
    let listContainer = document.createElement('div');
    listContainer.className = "wordLists";
    
    // Create HTML list elements for mastered and unmastered words and set HTML class tag
    // Mastered words
    let masteredWordsListElement = document.createElement('ul');
    masteredWordsListElement.className = "masteredWordsListElement wordsListElement";
    // Unmastered words
    let unmasteredWordsListElement = document.createElement('ul');
    unmasteredWordsListElement.className = "unmasteredWordsListElement wordsListElement";

    // Add lists to the list container
    listContainer.append(masteredWordsListElement)
    listContainer.append(unmasteredWordsListElement)
    
    // Set up a loop that goes through the items in listItems one at a time
    let numberOfListItems = i;
    
    // Create a list item for each word and place in apropriate list
    for (i = 0; i < listData.length; ++i) {

        // Create the HTML list item and set HTML class tag
        let listItem = document.createElement('li');
        listItem.className = "WordItem clickable";
        
        // Get the name of the word
        const wordName = listData[i].word;
        
        // Set up word audio on mouse over
        const clip_name = '../../assets/word_assets/word_audio/' + wordName + '.mp3';    
        listItem.onmouseover = function(){playClip(clip_name);};
        listItem.onmouseout = function(){stopClip(clip_name);};
        
        // Log word name when list item is clicked
        listItem.onclick = function(){console.log("Clicked="+wordName);};

        // Add the word name to the list item
        listItem.innerHTML = '<h2>' + wordName + '</h2>';
        // Add the word image to the list item
        imageItem = document.createElement('img');
        imageItem.src = '../../assets/word_assets/word_art/5/' + wordName + '.png';
        listItem.appendChild(imageItem);
        
        
        // Onclick function for all list items
        listItem.onclick = function(){console.log(wordName);};
        
        
        // Add listItem to the listElement
        if (listData[i].learned) {
            // Mastered words
            masteredWordsListElement.append(listItem);
        } else {
            // Unmastered words
            // Set onclock to go to quiz page
            listItem.onclick = function(){window.location.href = '../quiz/quiz.html';};
            unmasteredWordsListElement.append(listItem);
        }
    }
    
    // Add the lists div to the body of page
    document.getElementsByTagName('body')[0].appendChild(listContainer);
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
