import Deck from './Deck.js';

export default class Game {
  static _limitPoints = 21;
  static _deck = new Deck();

  nextPlayer() {
    // tableau de tous les joueurs en lice (non out et non on hold)
    const players = document.querySelectorAll('.playing');

    if (players.length === 1) return this.showWinners();

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
          // sinon, c'est celui à l'indice suivant
          nextPlayerPos = currentPlayerPos + 1;
          nextElPlayer = players[nextPlayerPos];
        }
        // mise à jour des styles CSS des elts DOM joueur
        nextElPlayer.classList.add('active');
        currentElPlayer.classList.remove('active');
      }
    }
  }

  showWinners() {
    // tableau des tous les joueurs sauf ceux qui sont out/éliminés: on va compter les points
    const players = document.querySelectorAll('.wPlayer:not(.out');

    // calcul des résultats: à combien de points sont ils de 21? le plus proche de 0 gagne
    const results = [];
    for (let player of players) {
      let playerFinalScore = Game._limitPoints - player.dataset.playerScore;
      // on pousse dans results un tab contenant l'id du joueur, son DOM node et son score final
      if (playerFinalScore >= 0) results.push([player.dataset.playerId, player, playerFinalScore]);
    }

    // si on a pas de résultats, on a pas de gagnants
    if (!results.length) {
      document.querySelector('.winners').innerHTML = 'Pas de gagnants!';
      this.incrementTotalGamePlayed();
      this.showNewGameBtn();
      return;
    }

    // on trie les résultats du plus petit au plus grand afin d'avoir les gagnants en début de tab
    results.sort((a, b) => a[2] - b[2]);
    const bestResult = results[0][2];

    let winnerMsg = '';

    // on loop sur les joueurs et celui ou ceux dont le score (à l'index 2 du tableau ligne 47) === le meilleur score gagne(nt)
    // on prépare la poutine css avec une sauce winner et une sauce loser
    results.forEach(p => {
      if (p[2] === bestResult) {
        p[1].classList.remove('active', 'playing', 'holding');
        p[1].classList.add('winner', 'winner-msg');
        !winnerMsg ? (winnerMsg += `Joueur ${p[0]}`) : (winnerMsg += ` + joueur ${p[0]}`);
      } else {
        p[1].classList.add('out');
        p[1].classList.remove('playing', 'active');
        p[1].insertAdjacentHTML('beforeend', '<div class="out-msg"></div>');
      }
    });

    // on affine un peu la sauce winner en cas de multiple winners pour être OK niveau aurtograffe
    document.querySelector('.winners').textContent = winnerMsg.includes('+')
      ? `${winnerMsg} gagnent!`
      : `${winnerMsg} gagne!`;
    this.incrementTotalGamePlayed();
    this.showNewGameBtn();
  }


  showNewGameBtn() {
    const newGame = document.querySelector('.new-game');
    newGame.classList.add('show');
  }

  // on compte le nb de parties jouées
  incrementTotalGamePlayed() {
    let gameNumber = sessionStorage.getItem('gameNumber') || 0;
    parseInt(gameNumber, 10);
    gameNumber++;
    sessionStorage.setItem('gameNumber', gameNumber);
    this.showTotalGames(gameNumber);
  }

  showTotalGames(gameNumber) {
    document.querySelector('.totalGames').textContent = `Parties jouées: #${gameNumber}`;
  }
}

