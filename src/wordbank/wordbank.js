window.onload = function makeList() {
    
    // Set poem reload to false, for when returning to wordbank from quiz
    bake_cookie("reload", false);
    
    // Establish the array which acts as a data source for the list
    var category = sessionStorage.getItem("category");
    console.log(category);

    let listData = JSON.parse(window.localStorage.getItem('words'))[category],

    // Make a container element for the list
    listContainerMastered = document.createElement('div'),
    listContainerUnmastered = document.createElement('div'),
    
    // Make the lists
    listElementMastered = document.createElement('ul'),
    listElementUnmastered = document.createElement('ul'),

    // Set up a loop that goes through the items in listItems one at a time
    numberOfListItems = listData.length,
    listItem,
    i;

    // Create wordList class elements for both Mastered and Unmastered words
    listContainerMastered.className = "wordList";
    listContainerUnmastered.className = "unmasteredWordsListElement wordList";
    
    // Add it to the page
    document.getElementById('mastered').appendChild(listContainerMastered);
    document.getElementById('unmastered').appendChild(listContainerUnmastered);

    listContainerMastered.appendChild(listElementMastered);
    listContainerUnmastered.appendChild(listElementUnmastered);

    for (i = 0; i < numberOfListItems; ++i) {
        // Create an listItem as a button for each word
        listItem = document.createElement('button');
        let wordObject = listData[i];
        const wordName = listData[i].word;
        listItem.className = "WordItem clickable";

        // Add audio mouse-over functionality to listItem
        const clip_name = '../../assets/word_assets/word_audio/' + wordName + '.mp3';   
        console.log(clip_name);
        listItem.onmouseover = function(){playClip(clip_name);};
        listItem.onmouseout = function(){stopClip(clip_name);};

        // Add the word's image and text to the listItem
        imageItem = document.createElement('img');
        imageItem.src = '../../assets/word_assets/word_art/' + category + '/' + listData[i].word + '.png';
        listItem.innerHTML = '';
        listItem.innerHTML = '<h2>' + listData[i].word + '</h2>';
        listItem.appendChild(imageItem);

        // Add listItem to the listElement of the correct container (mastered vs unmastered)
        if (listData[i].learned == true) {
            listElementMastered.appendChild(listItem);
        } else {
            listItem.onclick = function() {
                quizWord = wordObject;
                 // Store quizWord in the cookies
                bake_cookie('quizWord', quizWord);                
                // Go to quiz
                window.location.href = '../quiz/quiz.html';
            };
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

// Turn JS object into JSON and save cookie
function bake_cookie(name, value) {
    var cookie = [name, '=', JSON.stringify(value), '; path=/;'].join('');
    document.cookie = cookie;
}