// Creates category buttons 
window.onload = function makeButtons() {
    let friends = JSON.parse(window.localStorage.getItem('friends'));
    console.log(friends);

    // Setup div to hold the buttons
    let listContainer = document.createElement('div');

    listContainer.className = "tab";
    document.getElementsByTagName('body')[0].appendChild(listContainer);

    for(i = 0; i < friends.length; i++) {
        // create a button for each category in the list
        listItem = document.createElement('button');
        listItem.className = "tablinks clickable";
        listItem.id = friends[i].name;

        //onclick function used to populate words page
        listItem.onclick = function(){makeFriendList()};
        //create image element for each button

        // Add audio mouse-over functionality to listItem
        const clip_name = '../../assets/word_assets/word_audio/' + friends[i].name + '.mp3';   
        console.log(clip_name);
        listItem.onmouseover = function(){playClip(clip_name);};
        listItem.onmouseout = function(){stopClip(clip_name);};

        // Add the word's image and text to the listItem
        imageItem = document.createElement('img');
        imageItem.src = '../../assets/category_assets/' + friends[i].person.toLowerCase() + '.png';
        listItem.innerHTML = friends[i].name;
        listItem.appendChild(imageItem);
        listContainer.appendChild(listItem);
    }
}



function makeFriendList() {
    
    let exisitingLists = document.getElementById('wordLists');
    if (exisitingLists) {
        exisitingLists.parentElement.removeChild(exisitingLists);
    }

    // Establish the array which acts as a data source for the list
    var listData = JSON.parse(window.localStorage.getItem('friends')); 
    
    // Make a container element for the lists and set HTML class tag
    let listContainer = document.createElement('div');
    listContainer.className = "wordLists";
    listContainer.id = "wordLists";
    
    // Create HTML list elements for mastered and unmastered words and set HTML class tag
    // Mastered words
    let friendListElement = document.createElement('ul');
    friendListElement.className = "friendListElement";

    // Add lists to the list container
    listContainer.append(friendListElement)
    
    // Set up a loop that goes through the items in listItems one at a time

    
    // Create a list item for each word and place in apropriate list
    for (i = 0; i < listData.length; ++i) {

        // Create the HTML list item and set HTML class tag
        let listItem = document.createElement('li');
        listItem.className = "WordItem clickable";
        
        // Get the name of the word
        let friendObject = listData[i];
        const friendName = listData[i].name;
        
        // Set up word audio on mouse over
        const clip_name = '../../assets/word_assets/word_audio/' + friendName + '.mp3';    
        listItem.onmouseover = function(){playClip(clip_name);};
        listItem.onmouseout = function(){stopClip(clip_name);};
        
        // Log word name when list item is clicked
        listItem.onclick = function(){console.log(wordName);};

        // Add the word name to the list item
        listItem.innerHTML = '<h2>' + friendName + '</h2>';

        // Add the word image to the list item
        imageItem = document.createElement('img');
        imageItem.src = '../../assets/word_assets/word_art/' + 1 + '/' + "cook" + '.png';
        listItem.appendChild(imageItem);
        
        
        // Onclick function for all list items
        listItem.onclick = function(){console.log(friendName);};
        
        // Add listItem to the listElement ******** place function here that changes the name in data and on screen *********
        friendListElement.append(listItem);
    }
    // Add the lists div to the body of page
    console.log("yeet");
    document.getElementById('container').appendChild(listContainer);
}

/* Function that is called when any of the category buttons are selected on the wordbank.html page*/
/* Category ID number is stored and words.html is populated based on this ID selected */
// function categoryClick(clicked_id) {
//     sessionStorage.setItem("category", clicked_id);
//     location.href = '../wordbank/words.html';
// }

function playClip(clip_name) {
    if (navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 7")!=-1) || (navigator.appVersion.indexOf("MSIE 8")!=-1)) {
        if (document.all) {
            document.all.sound.src = "click.mp3";
        }
    } else {
        var audio = document.getElementById("friend_audio");
        audio.src = clip_name;
        const playPromise = audio.play();
        if (playPromise !== null){
            playPromise.catch(() => { console.log("Caught: playPromise !== null"); })
        }
    }
}

function stopClip(clip_name) {
    var audio = document.getElementById("friend_audio");
    audio.pause();
    audio.currentTime = 0;
}