function categoryClick(clicked_id) {
    sessionStorage.setItem("category", clicked_id);
    location.href = '../wordbank/words.html';
}