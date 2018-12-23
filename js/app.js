// Create an array for the fontAwesome different classes
var fAwsmClasses = ['fa-anchor',
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
var ul = document.createElement('ul');
ul.classList.add('deck');
fAwsmClasses.forEach(function(elem) {
    // li += `<li class="card open show"><i class="fa ${arrayElement}"></i>`)
    var li = document.createElement("li");
    var i = document.createElement("i");

    li.classList.add('card', 'open', 'show')
    i.classList.add('fa', elem);

    li.appendChild(i);
    ul.appendChild(li);
});

var divContainer = document.querySelector('.container');
divContainer.appendChild(ul);

// Shuffle  li's to arrange cards randomly on the grid
// Notes for me to remember:
// 1.  This is called Fisher -Yates Modern Shuffle Algorithm.
// 2. The loop should iterate over array from back to front bassing index 0.
// 3. Each loop pass generate a random number ranging between 0 and array length.
// 4. Each loop pass swap the current index value in the loop with (the last element the loop iterate)
// with index the random  index  (number) generated each loop.

var cardsNodeList = ul.querySelectorAll('li');
// this return a nodelist which is immutable so we cant shuffle it
// we need to convert it to an array using Array.from()
var cardsArray = Array.from(cardsNodeList);
function shuffle(cardsArray) {
    var currentIndex = cardsArray.length - 1, randomIndex, temporaryValue;
    for (currentIndex; currentIndex > 0; currentIndex--) {
    //     dev.innerHTML += ` current Index ${currentIndex} `;
    //     dev.innerHTML += ` --- Generate a random number between 0 and ${currentIndex} `;
        randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    //     dev.innerHTML += ` --- Generated: ${randomIndex}`;
    //     dev.innerHTML += ` --- swap value found at index ${currentIndex} and index ${randomIndex} <br>`;
         temporaryValue = cardsArray[randomIndex];
         cardsArray[randomIndex] = cardsArray[currentIndex];
         cardsArray[currentIndex] = temporaryValue;

     }
}
shuffle(cardsArray);
ul.innerHTML = '';
cardsArray.forEach(c => ul.appendChild(c));

