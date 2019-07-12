var consecutive_correct = 0;
var sight_word = "Rat";
var category = 1;

document.getElementById('cc').innerHTML = consecutive_correct;

shuffle_btns();

function shuffle_btns() {
    category_words =  words[category].slice();
    category_words.sort(() => Math.random() - 0.5);
    
    // Take 3 words from the category add the sight word and shufle
    category_words = category_words.slice(0,3);
    category_words.push(sight_word);
    category_words.sort(() => Math.random() - 0.5);

    var button_ids = ["btn1", "btn2", "btn3", "btn4"];
    var word_index = 0;
    button_ids.forEach(function(button_id) {
        word = category_words[word_index++];
        document.getElementById(button_id).innerHTML = word;
    });
}

function myFunction(clicked_id) {
    var clicked_word = document.getElementById(clicked_id).innerHTML;
    
    if (clicked_word == sight_word) {
        document.getElementById("result").innerHTML = "Correct!";
        document.getElementById('cc').innerHTML = ++consecutive_correct;
        document.body.style.backgroundColor = "green";
    } else {
        document.getElementById("result").innerHTML = "Wrong!";
        consecutive_correct = 0;
        document.getElementById('cc').innerHTML = consecutive_correct;
        document.body.style.backgroundColor = "red";
    }
    
    if (consecutive_correct >= 3) {
        document.getElementById("result").innerHTML = "Quiz Complete!";
        document.body.style.backgroundColor = "green";
        document.getElementById("choices").style.display = 'none';
    } else {
        shuffle_btns();
    }
}