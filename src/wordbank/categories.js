window.onload = function makeButtons() {
    let categoryList = categories;
    console.log(categoryList.length);
    numberOfItems = categoryList.length,
    i;
    listContainer = document.createElement('div');

    listContainer.className = "tab";
    document.getElementsByTagName('body')[0].appendChild(listContainer);

    for(i = 1; i <= 19; i++) {
        console.log("test");
        listItem = document.createElement('button');
        listItem.className = "tablinks clickable";
        listItem.id = i;
        listItem.onclick = function(){categoryClick(this.id)};
        imageItem = document.createElement('img');
        imageItem.src = '../../assets/category_assets/' + categoryList[i] + '.png';
        listItem.innerHTML = categoryList[i];
        listItem.appendChild(imageItem);
        listContainer.appendChild(listItem);
    }
}

/* Function that is called when any of the category buttons are selected on the wordbank.html page*/
/* Category ID number is stored and words.html is populated based on this ID selected */
function categoryClick(clicked_id) {
    sessionStorage.setItem("category", clicked_id);
    location.href = '../wordbank/words.html';
}
