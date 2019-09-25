// Only words with art are included in the array below.
const words = {
    1:["baby", "boy", "brother" , "child", "clown", "cook", "dancer", "family", "father", "girl", "grandma", "grandpa", "juggler", "king", "man", "mother", "nurse", "queen", "sister", "twin"],
    2:[],
    // ipmlementation of art for category 2 is in progress
    // 2:["Ali", "Han", "Duc", "Ron", "Pau", "Kim", "Eli", "Wen", "John", "Khalid", "Luis", "Sunil", "Sam", "Han", "Dev", "Don", "Ted", "Paz", "Jim", "Lin", "Will", "Alex", "Adam", "Joe", "Luz", "Nia",
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
const categories = {
    1: "People",
    2: "Friends",
    3: "Pretend",
    4: "Body Parts",
    5: "Animals",
    6: "Water Animals",
    7: "Birds",
    8: "Things",
    9: "House Stuff",
    10: "Toys",
    11: "Tools",
    12: "Clothes",
    13: "Vehicles",
    14: "Food",
    15: "Places",
    16: "Outdoors",
    17: "Doing",
    18: "Describe",
    19: "Colors"
}

var wordObjs = createWordObjs();

function wordObj(aWord, aCategory, aGender) {
	this.learned = false;
	this.word = aWord;
    this.category = aCategory;
    this.gender = aGender;
}
    /* NOTES FOR FUTURE IMPLEMENTATION:
    1. Mapping child names to child pictures. 
        -- Can be implemented by separating male and female pictures and adding a "gender"
        attribute to the word object (NEED: to make an issue for this)
        -- need a gray-scale function to show the associated picture in gray-scale if word is unlearned



    */

function createWordObjs() {
    var count = 0;
    var category;
    var wordTemp;
    var gender;
    var wordObjsTemp = {1: new Array, 2: new Array, 3: new Array, 4: new Array, 5: new Array, 6: new Array,
    				7: new Array, 8: new Array, 9: new Array, 10: new Array, 11: new Array, 12: new Array}

    // goes through the # of word categories
    for (i = 1; i <= 12; i++) {
        // makes a word object for each word in current category
        category = i.toString();
        for (j = 0; j < (words[category]).length; j++) {
        	wordTemp = new wordObj((words[category])[j], 
            parseInt(category), "neuter");
            if (j%5 == 0) {
                wordTemp.learned = true;
            }
        	wordObjsTemp[category].push(wordTemp);
            count++;
            
        }
    }

    // format is wordObsTemp[category][index in array].attribute
//     console.log(wordObjs);
    return wordObjsTemp;
}