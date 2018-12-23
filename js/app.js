// Create an array for the fontAwesome different classes
const fAwsmClasses = ['fa-anchor',
                   'fa-bicycle',
                   'fa-bolt',
                   'fa-bomb',
                   'fa-cube',
                   'fa-diamond',
                   'fa-leaf',
                   'fa-paper-plane-o',
                   'fa-anchor',
                   'fa-bicycle',
                   'fa-bolt',
                   'fa-bomb',
                   'fa-cube',
                   'fa-diamond',
                   'fa-leaf',
                   'fa-paper-plane-o'];

// create unorderd list contains the cards
let ul = document.createElement('ul');
ul.classList.add('deck');
fAwsmClasses.forEach(function(elem) {
    let li = document.createElement('li');
    let i = document.createElement('i');

    li.classList.add('card')
    i.classList.add('fa', elem);

    li.appendChild(i);
    ul.appendChild(li);
});

let divContainer = document.querySelector('.container');
divContainer.appendChild(ul);

let cardsNodeList = ul.querySelectorAll('li');
// this return a nodelist which is immutable so we cant shuffle it
// we need to convert it to an array using Array.from()
let cardsArray = Array.from(cardsNodeList);


/* Shuffle  li's to arrange cards randomly on the grid
======================================================
*/

/* Notes for me to remember:
    1.  This is called Fisher -Yates Modern Shuffle Algorithm.
    2. The loop should iterate over array from back to front bassing index 0.
    3. Each loop pass generate a random number ranging between 0 and array length.
    4. Each loop pass swap the current index value in the loop with (the last element the loop iterate)
with index the random  index  (number) generated each loop.*/
function shuffle(cardsArray) {
    var currentIndex = cardsArray.length - 1, randomIndex, temporaryValue;
    for (currentIndex; currentIndex > 0; currentIndex--) {
        randomIndex = Math.floor(Math.random() * (currentIndex + 1));
         temporaryValue = cardsArray[randomIndex];
         cardsArray[randomIndex] = cardsArray[currentIndex];
         cardsArray[currentIndex] = temporaryValue;
    }
}
// suffle the card with the browser refresh
shuffle(cardsArray)
ul.innerHTML = '';
cardsArray.forEach(c => ul.appendChild(c));

// suffle the card with the div.restart button
let restart = document.querySelector('.restart');
restart.onclick = function() {
    window.location.reload();
};



/* show the card on click
=========================
*/

let cards = document.querySelectorAll('.card');
let span = document.querySelector('.moves');
let moves, comparisonArr;
let stars = document.querySelectorAll('.stars i');
cards.forEach(function(li, index) {
    li.onclick = function() {
        li.classList.add('open');
        if(index === 0){
            moves = 0;
        } else if(index % 2 !== 0) {
            moves++;
            span.textContent = moves;
            if(moves === 10 ) {
                stars[2].classList.remove('fa-star');
                stars[2].classList.add('fa-star-o');
            } else if(moves === 15) {
                stars[1].classList.remove('fa-star');
                stars[1].classList.add('fa-star-o');
            }
        }
    };
});











