// const card = document.getElementById('card');

// card.onclick = function () {
//     card.classList.add('open', 'show');
// }

// Create an array for the fontAwesome different classes
// const fntAwsmClasses =
// const cardsArray =
// Shuffle the cardsArry to arrange cards randomly on the grid
//note for me to remember this is called Fisher -Yates Modern Shuffle Algorithm
// https://www.youtube.com/watch?v=tLxBwSL3lPQ
function shuffle(cardsArry) {
    let currentIndex = cardsArry.length, randomIndex, temporaryValue;
    for (let i = cardsArry.length - 1; i >=0; i--) {
        randomIndex = Math.floor(Math.random() * i);
        temporaryValue = cardsArry[i];
    }
}