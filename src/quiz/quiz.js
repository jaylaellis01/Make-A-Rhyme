var consecutive_correct = 0;
var sight_word = "ostrich";
var categoryTemp = 7;
var timedAudio;

let result = document.getElementById("result");

var instructions_audio = new Audio('../../assets/quiz_audio/instructions/00_Three_Times_in_a_row.mp3');
var sightWordImg = '../../assets/word_assets/word_art/' + categoryTemp + '/' + sight_word + '.png';
document.getElementById('word_art').src = sightWordImg;

var sight_word_audio_url = '../../assets/word_assets/word_audio/' + sight_word + '.mp3';
var sight_word_audio = new Audio(sight_word_audio_url);

var correct_audio = new Audio('../../assets/quiz_audio/praise_phrases/aa1_excellent_4b.mp3');

shuffle_btns();

function updateStars() {
    let stars = document.getElementsByClassName('star');
    var full_stars = 0;
    
    for (let star of stars) {
        if (full_stars++ < consecutive_correct) {
                star.src = "../../assets/star_full.png";
            } else {
                star.src = "../../assets/star_empty.png";
            }
    }
}

function shuffle_btns() {
    category_words =  words[categoryTemp].slice();
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

window.onload = function() {
    document.getElementById("my_audio").play();
}

function pauseAudio() {
    sight_word_audio.pause()
    sight_word_audio.currentTime = 0;
    instructions_audio.pause()
    instructions_audio.currentTime = 0;
    correct_audio.pause()
    correct_audio.currentTime = 0
}
function myFunction(clicked_id) {
    var clicked_word = document.getElementById(clicked_id).innerHTML;
    clearTimeout(timedAudio);
    pauseAudio();

    if (clicked_word == sight_word) {
        // Randomly selects a praise from audio.js
        random_praise = praises[Math.floor(Math.random() * 42)]
        correct_audio = new Audio('../../assets/quiz_audio/praise_phrases/' + random_praise + ".mp3")
        consecutive_correct++;
        result.innerHTML = "Correct!";
        result.style.color = "green";
        correct_audio.play();
    } else {
        //instructions_audio.play()
        result.innerHTML = "Wrong!";
        result.style.color = "red";
        if (consecutive_correct != 0) {
            instructions_audio.play();
            timedAudio = setTimeout(function(){ sight_word_audio.play(); }, 2200);
        } else {
            sight_word_audio.play();
        }
        consecutive_correct = 0;
        //sight_word_audio.play()
    }
    

    if (consecutive_correct >= 3) {
        instructions_audio.pause()
        sight_word_audio.pause()
        result.innerHTML = "Quiz Complete!";
        document.getElementById("choices").style.display = 'none';
    } else {
        shuffle_btns();
    }
    updateStars();
    
}