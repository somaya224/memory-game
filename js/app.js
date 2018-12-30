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

// create the div deck contains the cards
let deck = document.createElement('div');
deck.classList.add('deck');
fAwsmClasses.forEach(function(elem) {
  let cardContainer = document.createElement('div');
  let cardFront = document.createElement('div');
  let cardBack = document.createElement('div');
  let i = document.createElement('i');

  cardContainer.classList.add('card-container');
  cardBack.classList.add('card-back');
  cardFront.classList.add('card-front');
  i.classList.add('fa', elem);

  cardContainer.appendChild(cardBack);
  cardFront.appendChild(i);
  cardContainer.appendChild(cardFront);
  deck.appendChild(cardContainer);
});

let divContainer = document.querySelector('.container');
divContainer.appendChild(deck);

let cardsNodeList = deck.querySelectorAll('.card-container');
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
deck.innerHTML = '';
cardsArray.forEach(cardContainer => deck.appendChild(cardContainer));

// suffle the card with the div.restart button
let restart = document.querySelector('.restart');
restart.onclick = function() {
  window.location.reload();
};

let cards = document.querySelectorAll('.card-container');
  let count = 0;
  let twoCardsArr = [];
  let match = 0;
// loop through all cards to addAventListener
cards.forEach(function(card) {
  // name of handler is click and event handler is Respond function
  card.addEventListener('click', Respond);
  function Respond(e) {
    count++;
    // show the card on click
    let parent = e.target.parentElement;
    let cardContent = parent.querySelector('.card-front');
    cardContent.classList.add('card-front-open');
    let cardWall = parent.querySelector('.card-back');
    cardWall.classList.add('card-back-close');
    let moves = document.querySelector('.moves');
    twoCardsArr.push(parent);

    // handleing the stars rate
    let stars = document.querySelectorAll('.fa-star');
    if(count === 20) {
      stars[2].classList.remove('fa-star');
      stars[2].classList.add('fa-star-o');
    } else if(count === 30) {
      stars[1].classList.remove('fa-star');
      stars[1].classList.add('fa-star-o');
    }
    if(count % 2 === 0) {
      // hangling moves number
      moves.innerHTML = count / 2;
      // Adding class match to  every two identical cards
      // And remove the event handler from the two matched elements
      if(twoCardsArr.length === 2) {
        if(twoCardsArr[0].querySelector('i').classList.value === twoCardsArr[1].querySelector('i').classList.value){
          twoCardsArr.forEach(function(card){
            card.querySelector('.card-front-open').classList.add('match');
            card.removeEventListener('click', Respond);
          });
          twoCardsArr = [];
          match++;
          if(match === 8) {
            document.querySelector('.container').remove();
            // document.body.container.remove();
            let congrats = document.createElement('div');
            divContainer.appendChild(congrats);
            congrats.classList.add('congrats');
            let congMessage = document.createElement('h1');
            congMessage.classList.add('congMessage')
            congMessage.innerText = 'Congratulations! You Won!';
            congrats.appendChild(congMessage);
            let congDetails = document.createElement('p');
            congDetails.classList.add('details');
            console.log(moves.innerText);
            console.log(stars.length);
            congrats.appendChild(congDetails);
            // congDetails.innerText = "kjjhhjhfhj";
            congDetails.innerText = `With ${moves.innerText} Moves and ${stars.length} Stars.`;
            let cheer = document.createElement('p');
            cheer.classList.add('details');
            cheer.innerText = 'Wooooooo!';
            congrats.appendChild(cheer);
            let repeatBtn = document.createElement('div');
            repeatBtn.classList.add('repeat');
            repeatBtn.innerText = 'Play again!';
            congrats.appendChild(repeatBtn);
            document.body.appendChild(congrats);
            repeatBtn.onclick = function() {
              window.location.reload();
            };
          }
        } else {
          // Adding class not-match to the every two different cards
          twoCardsArr.forEach(card => card.querySelector('.card-front-open').classList.add('not-match'));
          // Close cards after 400ms by removing class card-front-open and also remove class not-match
          window.setTimeout(function() {
            twoCardsArr.forEach(card => card.querySelector('.card-front-open').classList.remove('card-front-open', 'not-match'));
            twoCardsArr.forEach(card => card.querySelector('.card-back-close').classList.remove('card-back-close', 'not-match'));
            // clear moves
            twoCardsArr = [];
          }, 400);
        }
      }
    }
  }
});

