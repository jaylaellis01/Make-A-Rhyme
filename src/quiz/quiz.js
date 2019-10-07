// Get the quiz word from cookies
var word = read_cookie('quizWord');
var sight_word = word.word;
var categoryTemp = word.category;

// Variables for quiz
var consecutive_correct = 0;
var max_consecutive_correct = 0;
var timedAudio;

// Setup audio and sight word image
var instructions_audio = new Audio('../../assets/quiz_audio/instructions/00_Three_Times_in_a_row.mp3');
var sight_word_audio_url = '../../assets/word_assets/word_audio/' + sight_word + '.mp3';
var sight_word_audio = new Audio(sight_word_audio_url);
var correct_audio = new Audio('../../assets/quiz_audio/praise_phrases/aa1_excellent_4b.mp3');
var sightWordImg = '../../assets/word_assets/word_art/' + categoryTemp + '/' + sight_word + '.png';

// Run quiz when the page has loaded
window.onload = function runQuiz() {
    let result = document.getElementById("result");
    document.getElementById('word_art').src = sightWordImg;

    // Quiz logic
    shuffle_btns();
    firstAudio();
}

// Play sight word audio when quiz starts
function firstAudio() {
    setTimeout(function(){ sight_word_audio.play(); }, 850);
}


// Function to update the number of stars (consecutive correct guesses)
function updateStars() {
    // Get the div for the stars
    let stars = document.getElementsByClassName('star');
    var full_stars = 0;
    
    // Iterate through stars and set full for number of correct guesses
    for (let star of stars) {
        if (full_stars++ < consecutive_correct) {
            star.src = "../../assets/Gold-Star-Blank.png";
        } else if (full_stars <= max_consecutive_correct) {
            star.src = "../../assets/Silver-Star-Blank.png";
        } else {
            star.src = "../../assets/star_empty.png";
        }
    }
}

// Suffle the quiz answer buttons
function shuffle_btns() {
    // Shuffle the words
    category_words =  words[categoryTemp].slice();
    category_words.sort(() => Math.random() - 0.5);
    indexOfSightWord = category_words.indexOf(sight_word);
    category_words.splice(indexOfSightWord, 1);
    
    // Take 1st 3 words from the shuffled words add the sight word and shufle order
    category_words = category_words.slice(0,3);
    category_words.push(sight_word);
    category_words.sort(() => Math.random() - 0.5);

    // Set word for each button
    var button_ids = ["btn1", "btn2", "btn3", "btn4"];
    var word_index = 0;
    button_ids.forEach(function(button_id) {
        word = category_words[word_index++];
        document.getElementById(button_id).innerHTML = word;
    });
}

// Pause the currently playing audio
function pauseAudio() {
    sight_word_audio.pause()
    sight_word_audio.currentTime = 0;
    instructions_audio.pause()
    instructions_audio.currentTime = 0;
    correct_audio.pause()
    correct_audio.currentTime = 0
}

// Check if answer is correct and if quiz is completed
function checkAnswer(clicked_id) {
    var clicked_word = document.getElementById(clicked_id).innerHTML;
    clearTimeout(timedAudio);
    pauseAudio();
    
    // If correct choice
    if (clicked_word == sight_word) {
        // Visual feedback for correct
        result.innerHTML = "Correct!";
        result.style.color = "green";
        // Randomly selects a praise from audio.js
        random_praise = praises[Math.floor(Math.random() * 42)];
        correct_audio = new Audio('../../assets/quiz_audio/praise_phrases/' + random_praise + ".mp3");
        correct_audio.play();
        // Increment correct choices
        consecutive_correct++;
        if (consecutive_correct > max_consecutive_correct) {
            max_consecutive_correct = consecutive_correct;
        }
    } else {
        // Visual feedback for incorrect
        result.innerHTML = "Wrong!";
        result.style.color = "red";
        if (consecutive_correct != 0) {
            instructions_audio.play();
            timedAudio = setTimeout(function(){ sight_word_audio.play(); }, 2200);
        } else {
            sight_word_audio.play();
        }
        
        if (consecutive_correct > max_consecutive_correct) {
            max_consecutive_correct = consecutive_correct;
        }
        // Reset correct choices
        consecutive_correct = 0;
    }
    
    // If quiz is finished
    if (consecutive_correct >= 3) {
        // Pause audio
        instructions_audio.pause()
        sight_word_audio.pause()
        // Show Quiz Complete on screen
        result.innerHTML = "Quiz Complete!";
        // Remove choice buttons
        document.getElementById("choices").style.display = 'none';
        // Set the quiz word as learnt
        wordObjs[categoryTemp].find(function(word){ return word.word == sight_word;}).learned = true;
        console.log(wordObjs[categoryTemp].find(function(word){ return word.word == sight_word;}));
        // Wait few seconds and return to poem page
        setTimeout(function(){
            bake_cookie("reload", true);
            window.history.back();
        }, 2000);
    } else {
        // If quiz not complete suffle the buttons
        shuffle_btns();
    }
    updateStars();
}

// Read JSON from cookies
function read_cookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}

// Turn JS object into JSON and save cookie
function bake_cookie(name, value) {
    var cookie = [name, '=', JSON.stringify(value), '; path=/;'].join('');
    document.cookie = cookie;
}