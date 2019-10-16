// Only words with art are included in the array below.
const words = {
    1:["baby", "boy", "brother" , "child", "clown", "cook", "dancer", "family", "father", "girl", "grandma", "grandpa", "juggler", "king", "man", "mother", "nurse", "queen", "sister", "twin"],
    // implementation of art for category 2 is in progress
    // 2:["Ali", "Han", "Duc", "Ron", "Pau", "Kim", "Eli", "Wen", "John", "Khalid", "Luis", "Sunil", "Sam", "Han", "Dev", "Don", "Ted", "Paz", "Jim", "Lin", "Will", "Alex", "Adam", "Joe", "Luz", "Nia",
    // 	"Peg", "Uma", "Rose", "Lily", "Ann", "Pat", "Deb", "Beth", "Zoe", "Eva", "Mia", "Rio", "Joy", "Mary", "Iris", "Joan", "Jan", "Kate"],
    2:["centaur", "cyclops", "dragon", "elf", "fairy", "mermaid", "yeti"],
    3:["ankle", "arm", "chin", "elbow", "face", "feet", "foot", "hair", "hand", "head", "lip", "mouth", "nose", "thigh", "thumb", "toe"],
    4:["ape", "ant", "bat", "bear", "bee", "bug", "camel", "cat", "centipede", "collie", "cow", "cub", "dog", "dogs", "donkey", "elk", "fly", "fox", "goat", "kitten", "mole", "monkey", "moth", "mouse",
    	"paw", "pet", "pig", "rabbit", "ram", "sheep", "skunk", "snail", "tail", "tiger", "toad", "wasp", "whale", "wolf", "worms", "zebra"],
    5:["beaver", "clam", "crab", "fish", "frog", "gator", "oyster", "seal", "shark"],
    6:["bird", "canary", "hen", "jay", "ostrich", "owl", "parrot", "swan"],
    7:["bags", "bed", "blanket", "box", "brick", "broom", "bubble", "cast", "clarinet", "clock", "coin", "cushion", "fashion", "flute", "fork",
        "fridge", "fright", "fringe", "glass"],
    8:["key", "light", "mirror", "money", "music", "net", "oven", "pan", "pearl", "pencil", "plug", "poison", "pot", "prize", "quiz", "saucepan",
        "skis", "soap", "sofa", "spoon", "squares", "string", "toilet", "tuba", "wheel", "zipper"],
    9:["ball", "block", "boat", "car", "crayon", "doll", "jeep", "jet", "present", "puppet", "slide", "stilts", "swing", "toys", "truck", "unicycle", "wagon", "yoyo"],
    10:["axe", "drill", "hatchet", "hoe", "nail", "rake", "saw", "tools"],
    11:["boots", "clothes", "dress", "glove", "hoodie", "jacket", "purse", "ring", "scarf", "shirt", "suit", "tie", "veil", "wig"],
    12:["ambulance", "boat", "bug", "bus", "car", "cars", "dozer", "go-kart", "jeep", "moped", "plane", "taxi", "truck", "van"],
    13:["apple", "bread", "burger", "cake", "candy", "carrot", "cone", "cookies", "corn", "grapes", "hotdog", "lettuce", "milk", "nuts", "pie", "plum", "pretzel", "snack", "tea"],
    14:["bridge", "hill", "house", "park", "school", "volcano", "zoo"],
    15:["air", "fern", "flag", "grass", "ice", "leaf", "moon", "rain", "rainbow", "sky", "snow", "star", "statue", "straw", "tree", "wall", "wind"],
    16:["balance", "blew", "burn", "chew", "chop", "clean", "cry", "cut", "dig", "draw", "drive", "fall", "fish", "flew", "float", "fly", "glue", "hit", "hug", "juggle", "jump", "lick",
        "look", "love", "paint", "play", "read", "rescue", "scold", "see", "sing", "ski", "skip", "sleep", "slip", "smell", "smile", "spill", "stand", "stop", "swim", "throw", "twinkle", "wash", "whisper", "yawn"],
    17:["afraid", "cloudy", "dark", "eight", "five", "high", "hot", "loud", "naughty", "old", "quiet", "rude", "silly", "six", "sixteen", "sleepy", "slow", "smart", "stripes", "twelve"],
    18:["black", "blue", "brown", "gold", "green", "purple", "red", "silver", "white", "yellow"]
};
const categories = {
    1: "People",
    2: "Pretend",
    3: "Body Parts",
    4: "Animals",
    5: "Water Animals",
    6: "Birds",
    7: "Things",
    8: "House Stuff",
    9: "Toys",
    10: "Tools",
    11: "Clothes",
    12: "Vehicles",
    13: "Food",
    14: "Places",
    15: "Outdoors",
    16: "Doing",
    17: "Describe",
    18: "Colors"
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
    				7: new Array, 8: new Array, 9: new Array, 10: new Array, 11: new Array, 12: new Array,
                    13: new Array, 14: new Array, 15: new Array, 16: new Array, 17: new Array, 18: new Array,
                    19: new Array}

    // goes through the # of word categories
    for (i = 1; i <= 18; i++) {
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
