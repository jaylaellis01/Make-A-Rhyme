window.onload = function makeList() {
    // Establish the array which acts as a data source for the list
    var category = sessionStorage.getItem("category");
    console.log(category);
    let listData = wordObjs[category],
    // Make a container element for the list
    listContainerMastered = document.createElement('div'),
    listContainerUnmastered = document.createElement('div'),

    // masteredList = document.getElementById("MasteredList");
    
    // Make the list
    listElementMastered = document.createElement('ul'),
    listElementUnmastered = document.createElement('ul'),
    // Set up a loop that goes through the items in listItems one at a time
    numberOfListItems = listData.length,
    listItem,
    i;
    
    listContainerMastered.className = "wordList";
    listContainerUnmastered.className = "wordList";
    
    
//    console.log(listData);
    // Add it to the page
    document.getElementById('mastered').appendChild(listContainerMastered);
    document.getElementById('unmastered').appendChild(listContainerUnmastered);
    // listContainer.appendChild(listElement);

    listContainerMastered.appendChild(listElementMastered);
    listContainerUnmastered.appendChild(listElementUnmastered);

    for (i = 0; i < numberOfListItems; ++i) {
        // create an item for each one
        console.log(listData[i].learned)
        listItem = document.createElement('button');
        listItem.className = "WordItem clickable";
        
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
