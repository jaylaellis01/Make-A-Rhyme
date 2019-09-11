// Only words with art are included in the array below.
const words = {
    1:["baby", "boy", "brother" , "child", "clown", "cook", "dancer", "family", "father", "girl", "grandma", "grandpa", "juggler", "king", "man", "mother", "nurse", "queen", "sister", "twin"],
    2:[],
    // there appears to be no art for any of the names (all of Category 2)
    // 2:["Ali", "Han", "Duc", "Ron", "Pau", "Kim", "Eli", "Wen", "John", "Khalid", "luis", "Sunil", "Sam", "Han", "Dev", "Don", "Ted", "Paz", "Jim", "Lin", "Will", "Alex", "Adam","Joe", "Luz", "Nia",
    // 	"Peg", "Uma", "Rose", "Lily", "Ann", "Pat", "Deb", "Beth", "Zoe", "Eva", "Mia", "Rio", "Joy", "Mary", "Iris", "Joan", "Jan", "Kate"],
    3:["centaur", "cyclops", "dragon", "elf", "fairy", "mermaid", "yeti"],
    4:["ankle", "arm", "chin", "elbow", "face", "feet", "foot", "hair", "hand", "head", "lip", "mouth", "nose", "thigh", "thumb", "toe"],
    5:["Ape", "ant", "bat", "bear", "bee", "bug", "camel", "cat", "centipede", "collie", "cow", "cub", "dog", "dogs", "donkey", "elk", "fly", "fox", "goat", "kitten", "mole", "monkey", "moth", "mouse",
    	"paw", "pet", "pig", "rabbit", "ram", "sheep", "skunk", "snail", "tail", "tiger", "toad", "wasp", "whale", "wolf", "worms", "zebra"],
    6:[],
    7:["bird", "canary", "hen", "jay", "ostrich", "owl", "parrot", "swan"],
    8:[],
    9:[],
    10:[],
    11:[],
    12:[]
};

var wordObjs = createWordObjs();

function wordObj(aWord, aCategory) {
	this.learned = false;
	this.word = aWord;
    this.category = aCategory;
}

function createWordObjs() {
    var count = 0;
    var category;
    var wordTemp;
    var wordObjsTemp = {1: new Array, 2: new Array, 3: new Array, 4: new Array, 5: new Array, 6: new Array,
    				7: new Array, 8: new Array, 9: new Array, 10: new Array, 11: new Array, 12: new Array}

    // goes through the # of word categories
    for (i = 1; i <= 12; i++) {
        // makes a word object for each word in current category
        category = i.toString();
        for (j = 0; j < (words[category]).length; j++) {
        	wordTemp = new wordObj((words[category])[j], parseInt(category));
        	wordObjsTemp[category].push(wordTemp);
            count++;
        }
    }

    // format is wordObsTemp[category][index in array].attribute
    // console.log(wordObjsTemp['7']['4'].learned);
    return wordObjs;
}