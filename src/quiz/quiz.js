// Get the quiz word from cookies
var word = read_cookie('quizWord');
var sight_word = word.word;
var categoryTemp = word.category;

// Variables for quiz
var consecutive_correct = 0;
var max_consecutive_correct = 0;
var consecutive_incorrect = 0;
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
    showLearnWord();
}

// Play sight word audio when quiz starts
function firstAudio() {
    setTimeout(function(){ sight_word_audio.play(); }, 850);
}

function showLearnWord() {
    firstAudio();
    document.getElementById("choices").style.display = 'none';
    document.getElementById("stars").style.display = 'none';
    result.innerHTML = sight_word;
    result.style.color = "black";
    
    // After 4 seconds continue with quiz
    setTimeout(function(){
        result.innerHTML = "";
        document.getElementById("stars").style.display = 'block';
        shuffle_btns(); 
    }, 4000);
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
    document.getElementById("choices").style.display = 'flex';
    // Retrieve all words
    var allWords;
    var nonSimilarWords = new Array;
    var similarWords = new Array;
    var randomTen = new Array;
    Papa.parse('../global/words.csv', {
        header: false,
        skipEmptyLines: true,
        download: true,
        skipEmptyLines: true,
        complete: function(results) {
            //console.log(results.data);
            allWords = results.data;

            // Find and place all similar and non-similar words into their own arrays
            for (i = 0; i <= 17; i++) {
                for (j = 0; j < allWords[i].length; j++) {
                    // If (first letter of current word == first letter of sight word)
                    if (allWords[i][j].charAt(0) == sight_word.charAt(0)) {
                        if (allWords[i][j] != sight_word) {
                            similarWords.push(allWords[i][j]);
                        }
                    } else {
                        nonSimilarWords.push(allWords[i][j]);
                    }
                }
            }
            //console.log(similarWords);

            // If we don't have the wanted number of 10 similar word options, pull from nonSimilarWords
            if (similarWords.length < 10) {
                var stillNeed = 10 - similarWords.length;
                nonSimilarWords.sort(() => Math.random() - 0.5);
                nonSimilarWords = nonSimilarWords.splice(0, stillNeed);
                randomTen = similarWords.concat(nonSimilarWords);
            // Else randomly pull 10 words from similarWords
            } else {
                similarWords.sort(() => Math.random() - 0.5);
                similarWords = similarWords.splice(0, 10);
                randomTen = similarWords;
            }

            // Shuffle the 10 randomly selected words --> is this only needed if there are less than 10 similar word options?
            randomTen.sort(() => Math.random() - 0.5);

            // Take 1st 3 words from the shuffled words then add the sight word and shuffle their order
            randomTen = randomTen.splice(0,3);
            randomTen.push(sight_word);
            console.log(randomTen);
            randomTen.sort(() => Math.random() - 0.5);
            console.log(randomTen);

            // Set word for each button
            var button_ids = ["btn1", "btn2", "btn3", "btn4"];
            var word_index = 0;
            button_ids.forEach(function(button_id) {
                word = randomTen[word_index++];
                document.getElementById(button_id).innerHTML = word;
            });
        }
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
        consecutive_incorrect = 0;
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
        consecutive_incorrect++;
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
    
        var words = JSON.parse(window.localStorage.getItem('words'));
        
        words[categoryTemp].find(function(word){ return word.word == sight_word;}).learned = true;
        window.localStorage.setItem('words', JSON.stringify(words));
        
        console.log(window.localStorage.getItem('words'));
        
        // Wait few seconds and return to poem page
        setTimeout(function(){
            bake_cookie("mastered", true);
            bake_cookie("reload", true);
            window.history.back();
        }, 2000);
    } else if (consecutive_incorrect >= 3) {
        showLearnWord();
    } else {
        // If quiz not complete suffle the buttons
        shuffle_btns();
    }
    updateStars();
}

function onClickBack() {
    bake_cookie("mastered", false);
    bake_cookie("reload", true);
    window.history.back();
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
