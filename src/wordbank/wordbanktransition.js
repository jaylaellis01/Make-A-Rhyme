/* Function that is called when any of the category buttons are selected on the wordbank.html page*/
/* Category ID number is stored and words.html is populated based on this ID selected */
function categoryClick(clicked_id) {
    sessionStorage.setItem("category", clicked_id);
    location.href = '../wordbank/words.html';
}