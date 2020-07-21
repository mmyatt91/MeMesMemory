document.addEventListener("DOMContentLoaded", function(){
    const cards = document.querySelectorAll(".game-card");
    let numCards = cards.length;
    let firstCard = null;
    let secondCard = null;
    let cardsFlipped = 0;
    let currentScore = 0;
    let lowScore = localStorage.getItem("low-score");

    if(lowScore){
        document.getElementById("highest-score").innerText = lowScore;
    }

    for(let card of cards){
        card.addEventListener("click", handleCardClick);
    }

    let btn1 = document.getElementById("start-button");
    btn1.addEventListener("click", startGame);
  
    function handleCardClick(e) {
      if (!e.target.classList.contains("front")) return;
  
      let currentCard = e.target.parentElement;
  
      if (!firstCard || !secondCard) {
        if (!currentCard.classList.contains("flipped")) {
          setScore(currentScore + 1);
        }
        currentCard.classList.add("flipped");
        firstCard = firstCard || currentCard;
        secondCard = currentCard === firstCard ? null : currentCard;
      }

  
      if (firstCard && secondCard) {
        let img1 = firstCard.children[1].children[0].src;
        let img2 = secondCard.children[1].children[0].src;
  
        if (img1 === img2) {
          cardsFlipped += 2;
          firstCard.removeEventListener("click", handleCardClick);
          secondCard.removeEventListener("click", handleCardClick);
          firstCard = null;
          secondCard = null;
        } else {
          setTimeout(function() {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard = null;
            secondCard= null;
          }, 1000);
        }
      }
  
        if (cardsFlipped === numCards) endGame();
    }
  
    function startGame() {
      setScore(0);
      start.classList.add("playing");
      let indices = [];
      for (let i = 1; i <= numCards / 2; i++) {
        indices.push(i.toString());
      }
      let pairs = shuffle(indices.concat(indices));
  
      for (let i = 0; i < cards.length; i++) {
        let path = "images/img" + pairs[i] + ".jpg";
        cards[i].children[1].children[0].src = path;
      }
      document.getElementById('game').classList.remove('hidden')

    }

  
    function shuffle(array) {
      let arrayCopy = array.slice();
      for (let idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
        // generate a random index between 0 and idx1 (inclusive)
        let idx2 = Math.floor(Math.random() * (idx1 + 1));
   
        // swap elements at idx1 and idx2
        let temp = arrayCopy[idx1];
        arrayCopy[idx1] = arrayCopy[idx2];
        arrayCopy[idx2] = temp;
      }
      return arrayCopy;
    }
  
    function setScore(newScore) {
      currentScore = newScore;
      document.getElementById("current-score").innerText = currentScore;
    }
  
    function endGame() {
      let end = document.getElementById("end");
      let scoreHeader = end.children[1];
      scoreHeader.innerText = "Your score: " + currentScore;
      let lowScore = +localStorage.getItem("low-score") || Infinity;
      if (currentScore < lowScore) {
        scoreHeader.innerText += " - NEW BEST SCORE!!";
        localStorage.setItem("low-score", currentScore);
      }
     const classList = document.getElementById("end").classList
      classList.add("game-over");
      classList.remove("hidden");
    }
  });
  


