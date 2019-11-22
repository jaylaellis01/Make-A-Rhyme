# Make-A-Rhyme

An iteractive web app to teach children sight words by using fun fillable rhymes and illustrations.
Designed for our client, Dr. Walter Evans as part of our Junior Design project for Georgia Tech.

# Release Notes
## Version 1.0.48
### What's New
* Ability to save rhymes as PDF or print them
* Friends and Word Bank links have been moved to side bar
* New color scheme and unified design elements
* Friends are only named by the user and can be named when completeing a rhyme
* Endstate for the rhyme has been added
### Bug Fixes 
* Amount of time word is displayed on the Quiz page has been shortened
* Format and Scaling of Rhyme Page has been fixed
* Title Tags have been added to all Pages
* Word Pop-up box closes after the user chooses a word
* Clicking on word multiple times no longer adds the word to the poem multiple times
* Unable to mess up order of rhyme boxes on first read through

### Known bugs and defects
* Occasionally after coming back from the quiz page to the poem page, some of the previously filled boxes will be blank for a few seconds before reappearing
* The words list is only built from the words.csv file if the words list is not saved in the browser's local storage. If a word is added to words.csv and there is a words list saved in browser's local storage then the words list will not be rebilt and the new word will not appear in the game until the local storage is cleared and words list is rebuilt from words.csv.

# Install Guide  

## Pre-requisites: 
There are no prequistites to installing or downloading this code.

## Download instructions:
* Clone or Download master branch.
* Upload source code to appropriate server

## Installation of actual application:
* No further steps are necessary for actual installation beyond downloading and uploading the code to the client's perferred server.

## Run instructions:
* Upload to server
* Open index.html

## Troubleshooting:
* If cloning the codebase was not done properly, please delete and try to clone from GitHub again.
* There should be no other issues when installing. 

## Instructions to add a new poem
All poem data is located in the src/poem/poem_data.json file. Taking a look at this file, you can set up a new poem similar to how the others are set up. Each poem is required to have:

- name: Name of poem
- image: Image location
- img_w: width of image
- img_h: height of image
- words: array of data for each word
    - x and y coordinates from the top left (as a proportion) for the location of the box/image on the background image
        - x,y between 0 and 1 (in order to scale properly)
        - (0,0) is the top left corner, (1,1) is the bottom right corner
        - Find pixel numbers for x,y on original image, then divide by image width and height respectively
    - categories: array of potential category numbers for that box (e.g [4,5,6] if the box could be an animal, a water animal, or a bird)
    - spot-id: ID of the box corresponding to the picture codes document (A, B, C, etc.)
- text: array of poem lines - each index of the array should correspond to an audio file
- cueBox: ID of the box that is cued after a certain poem line is read (e.g. after the index 0 line in Pet Party Picnic ("Once on a pretend time didn’t you tell me how") is read, index 0 in cueBox (box A) is cued for the child to select it)

After adding all of this poem data, all you need to do is add another div block in the landing.html file, similar to the div blocks that are there for the other poems.
