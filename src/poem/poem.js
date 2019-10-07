// Function to get cookie variable (used to get poem name)
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Inserts JSON data into template
$.getJSON("poem_data.json", function(data) {
    var template = $("#poem_template").html();
    var text = Mustache.render(template, data["poems"][getCookie("currentPoem")]);
    $("#target").html(text);
});

// Constructor for WordBox - the object that represents a word (or a box) on screen
function WordBox(x, y, w, h, fill, categories, word, completed, imgSrc) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fill = fill || 'rgba(232, 232, 232, 0.5)';
    this.completed = completed || false;
    this.word = word || null;
    this.categories = categories || [];
    this.imageSrc = imgSrc || null;
}

// Draws the WordBox - grey box if not completed, image if word is completed
WordBox.prototype.draw = function(ctx, fill) {
    // Draw grey boxes
    if (!this.completed) {
        ctx.fillStyle = fill;
        ctx.strokeStyle = '#000000';
        ctx.fillRect(this.x + (this.w * 0.1), this.y, this.w*0.8, this.h);
        ctx.fillRect(this.x, this.y + (this.h * 0.3), this.w, this.h*0.7);
        ctx.strokeRect(this.x + (this.w * 0.1), this.y, this.w*0.8, this.h);
        ctx.strokeRect(this.x, this.y + (this.h * 0.3), this.w, this.h*0.7);
    } else { // Draw image
        if (!document.getElementById(this.word)) { // Create image if it doesn't exist (can happen on page reload)
            let wordImage = document.createElement('img');
            wordImage.src = this.imageSrc;
            wordImage.id = this.word;
            document.getElementById('images').appendChild(wordImage);
        } 
        const image = document.getElementById(this.word);
        ctx.drawImage(image, this.x, this.y, this.w, this.h);
    }
}

  // Sees if the point (mx, my) is inside the box's area
WordBox.prototype.contains = function(mx, my) {
    return  (this.x <= mx) && (this.x + this.w >= mx) &&
            (this.y <= my) && (this.y + this.h >= my);
}

// "Completes" a word box by assigning a word and image
WordBox.prototype.fillWord = function(wordName, wordCat) {
    this.word = wordName;
    this.completed = true;
    this.imageSrc = '../../assets/word_assets/word_art/' + wordCat + '/' + wordName + '.png';
    let wordImage = document.createElement('img');
    wordImage.src = this.imageSrc;
    wordImage.id = this.word;
    document.getElementById('images').appendChild(wordImage);
}

// CanvasState keeps track of the state of the canvas
// I copied the template from this from the internet, thus there is some extra mouse stuff in here
function CanvasState(canvas) {
    // **** First some setup! ****
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
    // This complicates things a little but but fixes mouse co-ordinate problems
    // when there's a border or padding. See getMouse for more detail
    var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
        this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
        this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
        this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
    }
    // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
    // They will mess up mouse coordinates and this fixes that
    var html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

    // **** Keep track of state! ****

    this.valid = false; // when set to false, the canvas will redraw everything
    this.words = [];  // the collection of things to be drawn

    // the current selected object. In the future we could turn this into an array for multiple selection
    this.selection = null;
    this.clicked = false;

    // **** Then events! ****

    // This is an example of a closure!
    // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
    // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
    // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
    // This is our reference!
    var myState = this;

    // Fixes a problem where double clicking causes text to get selected on the canvas
    canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
    
    // Event for mouse click
    canvas.addEventListener('mousedown', function(e) {
        var mouse = myState.getMouse(e);
        var mx = mouse.x;
        var my = mouse.y;
        var words = myState.words;
        // Look through all of the WordBoxes to see if the mouse is inside of it
        for (var i = 0; i < words.length; i++) {
            // If where you clicked is inside of a WordBox, set the "clicked" state to true
            // This way the "selected" element won't be overwritten when you mouse over another object
            if (words[i].contains(mx, my)) {
                makeList(words[i].categories, myState);
                myState.clicked = true;
                return;
            }
        }
    }, true);

    // Event for mouse movement (to highlight boxes)
    canvas.addEventListener('mousemove', function(e) {
        var mouse = myState.getMouse(e);
        var mx = mouse.x;
        var my = mouse.y;
        var words = myState.words;
        if (!myState.clicked) { // If you haven't clicked on a box yet
            // Look through all of the WordBoxes to see if the mouse is inside of it
            for (var i = 0; i < words.length; i++) {
                // If the mouse is inside of the WordBox, set the box as selected (which will color it red)
                if (words[i].contains(mx, my)) {
                    var mySel = words[i];
                    myState.selection = mySel;
                    myState.valid = false;
                    return;
                }
            }
            // If the mouse is now outside the previously selected WordBox, deselect it
            if (myState.selection != null && !myState.selection.contains(mx, my)) {
                myState.selection = null;
            }
        }
    }, true);

    // **** Options! ****

    this.selectionColor = 'rgba(0, 232, 0, 0.5)';
    this.selectionWidth = 2;  
    this.interval = 30;
    setInterval(function() { myState.draw(); }, myState.interval);
}

CanvasState.prototype.addWord = function(word) {
    this.words.push(word);
    this.valid = false;
}


// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
CanvasState.prototype.getMouse = function(e) {
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    // Compute the total offset
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    // Add padding and border style widths to offset
    // Also add the <html> offsets in case there's a position:fixed bar
    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    // We return a simple javascript object (a hash) with x and y defined
    return {x: mx, y: my};
}

// Tries to fill selected WordBox with the provided word
// redraw param is for the edge case of selecting an unmastered word. 
// You want to fill the word, but don't want to show it until after the quiz
CanvasState.prototype.fillWord = function(wordName, wordCat, redraw) {
    if (this.selection != null) {
        this.selection.fillWord(wordName, wordCat);
        this.selection = null;
        this.clicked = false;
        this.valid = !redraw;
    }
}

// Save state of words in localStorage for when you go to the quiz page
CanvasState.prototype.saveState = function() {
    localStorage.setItem("canvasWords", JSON.stringify(this.words));
}

// Load the state of the words for when you come back from the quiz page
CanvasState.prototype.loadState = function() {
    var load = JSON.parse(localStorage.getItem("canvasWords"));
    if (load != null) {
        for (var i = 0; i < load.length; i++) {
            var w = load[i];
            this.addWord(new WordBox(w.x, w.y, w.w, w.h, w.fill, w.categories, w.word, w.completed, w.imageSrc));
        }
        this.valid = false;
    }
}

// Function that actually draws the stuff on the canvas
CanvasState.prototype.draw = function() {
  // if our state is invalid, redraw and validate!
  if (!this.valid) {
    var ctx = this.ctx;
    var words = this.words;

    // draw background
    var img = document.getElementById('background');
    ctx.drawImage(img, 0, 0);

    // draw all words
    for (var i = 0; i < words.length; i++) {
      if (this.selection != null && this.selection == words[i]) {
        words[i].draw(ctx, this.selectionColor);
      } else {
        words[i].draw(ctx, words[i].fill);
      }
    }

    this.valid = true;
  }
}

function makeList(categories, canvasState) {
    
    let exisitingLists = document.getElementById('wordLists');
    if (exisitingLists) {
        exisitingLists.parentElement.removeChild(exisitingLists);
    }
    
    // Establish the array which acts as a data source for the list
    var listData = [];
    for (var i = 0; i < categories.length; i++) {
        if (categories[i] < 1) {
            continue;
        }
        Array.prototype.push.apply(listData, wordObjs[categories[i]]);
    }
    // Make a container element for the lists and set HTML class tag
    let listContainer = document.createElement('div');
    listContainer.className = "wordLists";
    listContainer.id = "wordLists";
    
    // Create HTML list elements for mastered and unmastered words and set HTML class tag
    // Mastered words
    let masteredWordsListElement = document.createElement('ul');
    masteredWordsListElement.className = "masteredWordsListElement wordsListElement";
    // Unmastered words
    let unmasteredWordsListElement = document.createElement('ul');
    unmasteredWordsListElement.className = "unmasteredWordsListElement wordsListElement";

    // Add lists to the list container
    listContainer.append(masteredWordsListElement)
    listContainer.append(unmasteredWordsListElement)
    
    // Set up a loop that goes through the items in listItems one at a time
    let numberOfListItems = i;
    
    // Create a list item for each word and place in apropriate list
    for (i = 0; i < listData.length; ++i) {

        // Create the HTML list item and set HTML class tag
        let listItem = document.createElement('li');
        listItem.className = "WordItem clickable";
        
        // Get the name of the word
        let wordObject = listData[i];
        const wordName = listData[i].word;
        const wordCat = listData[i].category;
        
        // Set up word audio on mouse over
        const clip_name = '../../assets/word_assets/word_audio/' + wordName + '.mp3';    
        listItem.onmouseover = function(){playClip(clip_name);};
        listItem.onmouseout = function(){stopClip(clip_name);};
        
        // Log word name when list item is clicked
        listItem.onclick = function(){console.log(wordName);};

        // Add the word name to the list item
        listItem.innerHTML = '<h2>' + wordName + '</h2>';
        // Add the word image to the list item
        imageItem = document.createElement('img');
        imageItem.src = '../../assets/word_assets/word_art/' + wordCat + '/' + wordName + '.png';
        listItem.appendChild(imageItem);
        
        
        // Onclick function for all list items
        listItem.onclick = function(){console.log(wordName);};
        
        
        // Add listItem to the listElement
        if (listData[i].learned) {
            // Mastered words
            listItem.onclick = function() {
                canvasState.fillWord(wordName, wordCat, true);
            }
            masteredWordsListElement.append(listItem);
        } else {
            // Unmastered words
            // Set onclock to go to quiz page
            listItem.onclick = function() {
                canvasState.fillWord(wordName, wordCat, false);
                quizWord = wordObject;
                 // Store quizWord in the cookies
                bake_cookie('quizWord', quizWord);                
                // Go to quiz
                canvasState.saveState();
                window.location.href = '../quiz/quiz.html';
            };
            unmasteredWordsListElement.append(listItem);
        }
    }
    // Add the lists div to the body of page
    document.getElementById('container').appendChild(listContainer);
}

function bake_cookie(name, value) {
    var cookie = [name, '=', JSON.stringify(value), '; path=/;'].join('');
    document.cookie = cookie;
}
function read_cookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}

function playClip(clip_name) {
    if (navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 7")!=-1) || (navigator.appVersion.indexOf("MSIE 8")!=-1)) {
        if (document.all) {
            document.all.sound.src = "click.mp3";
        }
    } else {
        var audio = document.getElementById("word_audio");
        audio.src = clip_name;
        const playPromise = audio.play();
        if (playPromise !== null){
            playPromise.catch(() => { console.log("Caught: playPromise !== null"); })
        }
    }
}

function stopClip(clip_name) {
    var audio = document.getElementById("word_audio");
    audio.pause();
    audio.currentTime = 0;
}

// Init function called on page load
function init() {
    var s = new CanvasState(document.getElementById('canvas'));
    var canvas = document.getElementById('canvas');
    var width = canvas.width;
    var height = canvas.height;
    // if we are coming back from the quiz, reload state of words
    if (read_cookie('reload')) {
        s.loadState();
        s.draw();
        bake_cookie('reload', false);
    } else { // else, get word info from JSON
        $.getJSON("poem_data.json", function(data) {
            var wordsArr = data["poems"][getCookie("currentPoem")]["words"];
            var fillColor = 'rgba(232, 232, 232, 0.5)'
            for (i = 0; i < wordsArr.length; i++) {
                var word = wordsArr[i];
                s.addWord(new WordBox(word["x"]*width, word["y"]*height, 100, 100, fillColor, word["categories"]))
            } 
        });
    }
}

