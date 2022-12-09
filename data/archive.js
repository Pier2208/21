import Deck from './Deck.js';

export default class Game {
  static _limitPoints = 21;
  static _deck = new Deck();

  nextPlayer() {
    const players = document.querySelectorAll('.playing');

    if (players.length === 1 && this._score <= 21) this.showWinners();
    if (players.length === 1 && this._score >= 21) this.showNoWinners();

    for (let [playerPos, elPlayer] of players.entries()) {
      let currentPlayerPos;
      let currentElPlayer;
      let nextPlayerPos;
      let nextElPlayer;

      // trouver la position du joueur courant
      if (this._playerId === elPlayer.dataset.playerId) {
        currentPlayerPos = playerPos; // position du joueur courant
        currentElPlayer = elPlayer; // elt DOM du joueur courant

        // si le joueur courant est dernier ds le tab, alors le prochain joueur sera celui en début de tab
        if (currentPlayerPos === players.length - 1) nextElPlayer = players[0];
        else {
          // sinon, c'est simplement celui à l'indice suivant
          nextPlayerPos = currentPlayerPos + 1;
          nextElPlayer = players[nextPlayerPos];
        }
        // mise à jour des styles CSS des elts DOM joueur
        nextElPlayer.classList.add('active');
        nextElPlayer.classList.remove('inactive');
        currentElPlayer.classList.remove('active');
        currentElPlayer.classList.add('inactive');
      }
    }
  }

  showWinners() {
    const players = document.querySelectorAll('.wPlayer:not(.out');
    console.log(players)
    const results = [];
    for (let player of players) {
      let playerFinalScore = Game._limitPoints - player.dataset.playerScore;
      if (playerFinalScore >= 0) results.push([player.dataset.playerId, player, playerFinalScore]);
    }

    results.sort((a, b) => a[2] - b[2]);
    const bestResult = results[0][2];

    results.forEach(p => {
      if (p[2] === bestResult) {
        p[1].classList.remove('active', 'playing', 'holding');
        p[1].classList.add('winner', 'winner-msg');
      } else {
        p[1].classList.add('out', 'inactive');
        p[1].classList.remove('playing', 'active');
        p[1].insertAdjacentHTML('beforeend', '<div class="out-msg"></div>');
      }
    });
    this.incrementTotalGamePlayed();
    this.showNewGameBtn();
  }

  showNoWinners() {
    console.log('No winners');
    this.incrementTotalGamePlayed();
    this.showNewGameBtn();
  }

  showNewGameBtn() {
    const newGame = document.querySelector('.new-game');
    newGame.classList.add('show');
  }

  incrementTotalGamePlayed() {
    let gameNumber = sessionStorage.getItem('gameNumber') || 0;
    parseInt(gameNumber, 10);
    gameNumber++;
    sessionStorage.setItem('gameNumber', gameNumber);
  }
}
