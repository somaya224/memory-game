// Create an array for the fontAwesome different classes
const fAwsmClasses = [
  "fa-anchor",
  "fa-bicycle",
  "fa-bolt",
  "fa-bomb",
  "fa-cube",
  "fa-diamond",
  "fa-leaf",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bicycle",
  "fa-bolt",
  "fa-bomb",
  "fa-cube",
  "fa-diamond",
  "fa-leaf",
  "fa-paper-plane-o"
];

// create the div deck contains the cards
let deck = document.createElement("div");
deck.classList.add("deck");
let deckFragment = document.createDocumentFragment(); // for deck
let cardContainerFragement = document.createDocumentFragment(); // for cardContainer

fAwsmClasses.forEach(function(elem) {
  let cardContainer = document.createElement("div");
  let cardFront = document.createElement("div");
  let cardBack = document.createElement("div");
  let i = document.createElement("i");

  cardContainer.classList.add("card-container");
  cardBack.classList.add("card-back");
  cardFront.classList.add("card-front");
  i.classList.add("fa", elem);

  cardContainerFragement.appendChild(cardBack);
  cardFront.appendChild(i);
  cardContainerFragement.appendChild(cardFront);
  cardContainer.appendChild(cardContainerFragement);
  deckFragment.appendChild(cardContainer);
});

let cardsList = deckFragment.querySelectorAll(".card-container");
let cardsArray = Array.from(cardsList);

// Shuffle  li's to arrange cards randomly on the grid
function shuffle(cardsArray) {
  var currentIndex = cardsArray.length - 1,
    randomIndex,
    temporaryValue;
  for (currentIndex; currentIndex > 0; currentIndex--) {
    randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    temporaryValue = cardsArray[randomIndex];
    cardsArray[randomIndex] = cardsArray[currentIndex];
    cardsArray[currentIndex] = temporaryValue;
  }
}

// suffle the card with the browser refresh
shuffle(cardsArray);

// clear decFragment
deckFragment
  .querySelectorAll(".card-container")
  .forEach(c => deckFragment.removeChild(c));

// add the new shuffled cards into the deckFragment
cardsArray.forEach(function(card) {
  deckFragment.appendChild(card);
});

deck.innerHTML = "";
deck.appendChild(deckFragment);
// clear decFragment
deckFragment
  .querySelectorAll(".card-container")
  .forEach(c => deckFragment.removeChild(c));

let container = document.querySelector(".container");
container.appendChild(deck);

// suffle the card with the div.restart button
let restart = document.querySelector(".restart");
restart.onclick = function() {
  window.location.reload();
};

// set interval
let timerStarted = false;
let timer = false;
let msec = 0,
  sec = 0,
  min = 0;
let stopwatch = document.querySelector(".stopwatch");
function run() {
  stopwatch.innerText =
    (min < 10 ? "0" + min : min) +
    "m :" +
    (sec < 10 ? "0" + sec : sec) +
    "s :" +
    (msec < 10 ? "0" + msec : msec) +
    "ms";
  msec++;
  if (msec === 100) {
    msec = 0;
    sec++;
  }
  if (sec === 60) {
    sec = 0;
    min++;
  }
}

//  addAventListener to deck and use Event Delegation and phases of event to reach each individual card
let cards = document.querySelectorAll(".card-container");
let count = 0;
let twoCardsArr = [];
let match = 0;
deck.addEventListener("click", respond, false);
function respond(e) {
  if (timerStarted === false) {
    timer = setInterval(run, 10);
    timerStarted = true;
  }

  // Make sure that the target will be cards not the deck
  let target = e.target;
  if (target.classList.contains("deck")) return;
  if (target.classList.contains("card-container")) return;

  // show the card on click
  let cardWall = target;
  let cardContent = target.nextSibling;
  if (!cardContent) return;
  if (cardContent && cardContent.classList.contains("card-front-open")) return;
  if (cardContent && cardContent.classList.contains("match")) return;
  cardContent.classList.add("card-front-open");
  cardWall.classList.add("card-back-close");
  twoCardsArr.push(cardContent.parentElement);

  // handleing the stars rate
  count++;
  let stars = document.querySelectorAll(".fa-star");
  if (count === 20) {
    stars[2].classList.remove("fa-star");
    stars[2].classList.add("fa-star-o");
  } else if (count === 30) {
    stars[1].classList.remove("fa-star");
    stars[1].classList.add("fa-star-o");
  }

  // hangling moves number
  let moves = document.querySelector(".moves");
  if (count % 2 === 0) {
    moves.innerHTML = count / 2;
  }

  // Adding class match to  every two identical cards
  // And remove the event handler from the two matched elements
  if (twoCardsArr.length === 2) {
    if (
      twoCardsArr[0].querySelector("i").classList.value ===
      twoCardsArr[1].querySelector("i").classList.value
    ) {
      twoCardsArr.forEach(card =>
        card.querySelector(".card-front-open").classList.add("match")
      );
      twoCardsArr = [];
      match++;
    } else {
      // Adding class not-match to the every two different cards
      twoCardsArr.forEach(card =>
        card.querySelector(".card-front-open").classList.add("not-match")
      );
      // Close cards after 400ms by removing class card-front-open and also remove class not-match
      window.setTimeout(function() {
        twoCardsArr.forEach(card =>
          card
            .querySelector(".card-front-open")
            .classList.remove("card-front-open", "not-match")
        );
        twoCardsArr.forEach(card =>
          card
            .querySelector(".card-back-close")
            .classList.remove("card-back-close", "not-match")
        );
        // clear moves
        twoCardsArr = [];
      }, 400);
    }
  }
  if (match === fAwsmClasses.length / 2) {
    clearInterval(timer);

    let loader = document.createElement("div");
    let tick = document.createElement("div");
    let congrats = document.createElement("div");
    let congMessage = document.createElement("h1");
    let congDetails = document.createElement("p");
    let finalInterval = document.createElement("span");
    let cheer = document.createElement("p");
    let repeatBtn = document.createElement("div");

    loader.classList.add("loader");
    tick.classList.add("tick");
    congrats.classList.add("congrats");
    congMessage.classList.add("congMessage");
    repeatBtn.classList.add("repeat");

    tick.innerText = "✓";
    congMessage.innerText = "Congratulations! You Won!";
    congDetails.innerText = `With ${moves.innerText} Moves and ${
      stars.length
    } Stars.`;
    finalInterval.innerText = stopwatch.innerText;
    cheer.innerText = "Wooooooo!";
    repeatBtn.innerText = "Play again!";

    loader.appendChild(tick);
    window.setTimeout(function() {
      document.querySelector(".container").remove();
      deckFragment.appendChild(loader);
      deckFragment.appendChild(congMessage);
      deckFragment.appendChild(congDetails);
      deckFragment.appendChild(finalInterval);
      deckFragment.appendChild(cheer);
      deckFragment.appendChild(repeatBtn);
      congrats.appendChild(deckFragment);
    }, 1000);

    document.body.appendChild(congrats);
    repeatBtn.onclick = function() {
      window.location.reload();
    };
  }
}
