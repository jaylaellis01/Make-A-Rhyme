window.onload = function makeList() {
    // Establish the array which acts as a data source for the list
    let listData = words[1],
    // Make a container element for the list
    listContainer = document.createElement('div'),

    // masteredList = document.getElementById("MasteredList");
    
    // Make the list
    listElement = document.createElement('ul'),
    // Set up a loop that goes through the items in listItems one at a time
    numberOfListItems = listData.length,
    listItem,
    i;
    
    listContainer.className = "wordList";
    
    
//    console.log(listData);
    // Add it to the page
    document.getElementsByTagName('body')[0].appendChild(listContainer);
    // listContainer.appendChild(listElement);

    listContainer.appendChild(listElement);

    for (i = 0; i < numberOfListItems; ++i) {
        // create an item for each one
        listItem = document.createElement('button');
        listItem.className = "WordItem clickable";
        
        
        imageItem = document.createElement('img');

        // Add the item text
        imageItem.src = '../../assets/word_assets/word_art/1/' + listData[i] + '.png';
        listItem.innerHTML = '';
        listItem.innerHTML = '<h2>' + listData[i] + '</h2>';
        listItem.appendChild(imageItem);
        

        // Add listItem to the listElement
        listElement.appendChild(listItem);
    }
}
