// Creates category buttons 
window.onload = function makeButtons() {
    firstAudio();
    let friends = JSON.parse(window.localStorage.getItem('friends'));
    console.log(friends);

    // Setup div to hold the buttons
    let listContainer = document.createElement('div');
    listContainer.className = "tab";

    for(i = 0; i < friends.length; i++) {
        // create a button for each category in the list
        listItem = document.createElement('button');
        listItem.className = "tablinks clickable";
        listItem.id = friends[i].person;
        let clickedPerson = friends[i].person;

        //onclick function used to populate words page
        listItem.onclick = function(){makeFriendList(clickedPerson)};

        // Add audio mouse-over functionality to listItem
        const clip_name = '../../assets/word_assets/word_audio/' + friends[i].name + '.mp3';   
        listItem.onmouseenter = function(){playClip(clip_name);};
        listItem.onmouseleave = function(){stopClip(clip_name);};

        // Add the word's image and text to the listItem
        imageItem = document.createElement('img');
        imageItem.src = '../../assets/friend_art/' + friends[i].person + '.png';
        listItem.innerHTML = friends[i].name;
        listItem.appendChild(imageItem);
        listContainer.appendChild(listItem);
    }
    document.getElementById('container').appendChild(listContainer);
}


function makeFriendList(clickedPerson) {
    
    console.log("yeet")
    let exisitingLists = document.getElementById('wordLists');
    if (exisitingLists) {
        exisitingLists.parentElement.removeChild(exisitingLists);
    }

    // Establish the array which acts as a data source for the list
    var listData = JSON.parse(window.localStorage.getItem('friends'));
    console.log(listData);
    
    // Make a container element for the lists and set HTML class tag
    let listContainer = document.createElement('div');
    listContainer.className = "wordLists";
    listContainer.id = "wordLists";
    
    // Create HTML list elements for mastered and unmastered words and set HTML class tag
    let friendListElement = document.createElement('ul');
    friendListElement.className = "friendListElement";

    // Add lists to the list container
    listContainer.append(friendListElement)
    
    // Set up a loop that goes through the items in listItems one at a time

    
    Papa.parse('../global/friends.csv', {
        header: false,
        skipEmptyLines: true,
        download: true,
        skipEmptyLines: true,
        complete: function(results) {
            friendNames = results.data[0];
            // Create a list item for each word and place in apropriate list
            for (i = 0; i < listData.length; ++i) {

                // Create the HTML list item and set HTML class tag
                let listItem = document.createElement('li');
                listItem.className = "WordItem clickable";
                listItem.id = friendNames[i];
                
                // Get the name of the word
                let friendObject = listData[i];
                
                // Set up word audio on mouse over
                const clip_name = '../../assets/word_assets/word_audio/' + friendNames[i] + '.mp3';    
                listItem.onmouseenter = function(){playClip(clip_name);};
                listItem.onmouseleave = function(){stopClip(clip_name);};
                listItem.onclick = function(){}
                
                // Log word name when list item is clicked
                listItem.onclick = function(){console.log(wordName);};

                // Add the word name to the list item
                listItem.innerHTML = '<h2>' + friendNames[i] + '</h2>';  
                
                // Onclick function for all list items
                listItem.onclick = function(){console.log(friendName);};
                
                // Add listItem to the listElement
                listItem.onclick = function() {
                    // Change the name of the friend in storage
                    var friends = JSON.parse(window.localStorage.getItem('friends'));
                    friends.find(function(friendObject) { return friendObject.person == clickedPerson;}).name = this.id;
                    window.localStorage.setItem('friends', JSON.stringify(friends));

                    // Change text of button to match the new given name
                    var div = document.getElementById(clickedPerson),
                        img = div.getElementsByTagName('img')[0];
                    div.onmouseenter = function(){playClip(clip_name);};
                    div.onmouseleave = function(){stopClip(clip_name);};
                    div.innerHTML = this.id;
                    div.appendChild(img);
                }
                friendListElement.append(listItem);
            }
        }
    });

    // Add the lists div to the body of page
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

var friend_audio_init_url = '../../assets/friend_audio/' + 'B1' + '.mp3';
var friend_audio_init = new Audio(friend_audio_init_url);

function randAudio() {
    x = Math.random();
    if (x <= 0.5) {
        return 1;
    } else {
        return 2;
    }
}

function firstAudio() {
    setTimeout(function(){ friend_audio_init.play(); }, 850);
}

function pickNameAudio() {
    var pick_name_audio_url = '../../assets/friend_audio/' + 'C' + randAudio() + '.mp3';
    playClip(pick_name_audio_url)
}

function firstAudio() {
    setTimeout(function(){ friend_audio_init.play(); }, 850);
}
