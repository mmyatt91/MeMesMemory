document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".game-card");
    let numCards = cards.length;
    let first = null;
    let second = null;
    let cardsFlipped = 0;
    let currentScore = 0;
    let lowScore = localStorage.getItem("highest-score");
  
    if (lowScore) {
      document.getElementById("highest-score").innerText = lowScore;
    }
  
    for (let card of cards) {
      card.addEventListener("click", handleCardClick);
    }
  
    let btn1 = document.getElementById("start-button");
    btn1.addEventListener("click", startGame);
  
    function handleCardClick(e) {
      if (!e.target.classList.contains("front")) return;
  
      let currentCard = e.target.parentElement;
  
      if (!first || !second) {
        if (!currentCard.classList.contains("flipped")) {
          setScore(currentScore + 1);
        }
        currentCard.classList.add("flipped");
        first = first || currentCard;
        second = currentCard === first ? null : currentCard;
      }
  
      if (first && second) {
        let img1 = first.children[1].children[0].src;
        let img2 = second.children[1].children[0].src;
  
        if (img1 === img2) {
          cardsFlipped += 2;
          first.removeEventListener("click", handleCardClick);
          second.removeEventListener("click", handleCardClick);
          first = null;
          second = null;
        } else {
          setTimeout(function() {
            first.classList.remove("flipped");
            second.classList.remove("flipped");
            first = null;
            second = null;
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
      let lowScore = +localStorage.getItem("highest-score") || Infinity;
      if (currentScore < lowScore) {
        scoreHeader.innerText += " - NEW BEST SCORE!!";
        localStorage.setItem("highest-score", currentScore);
      }
      document.getElementById("end").classList.add("game-over");
    }
  });
  