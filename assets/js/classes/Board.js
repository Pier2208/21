import Player from './Player.js';

export default class Board {
  gameBoard = document.querySelector('.game-board');

  // insertion dans le DOM
  createPlayers(playerId) {
    const newPlayer = `
                        <div class="wPlayer playing" data-player-id=${playerId} data-player-score>
                            <img class="player__avatar" src="assets/img/player${playerId}.jpeg" />
                            <h3 class="player__name">Joueur ${playerId}</h3>
                            <div class="player__board"></div>
                            <div class="player__score">0 points</div>
                            <div class="player__actions">
                                <button class="player__actions--play">Jouer</button>
                                <button class="player__actions--stop">Stop</button>
                            </div>
                        </div>
                        `;

    this.gameBoard.insertAdjacentHTML('beforeend', newPlayer);

    // pour chaque DOM node de joueurs, on insuffle vie et amour, ou tout simplement du comportement
    const players = document.querySelectorAll('.wPlayer');
    for (let player of players) {
      player.dataset.playerId === '1' && player.classList.add('active');
      new Player(player);
    }
  }

  // petite transition entre la soumission du form et le début du jeu
  transitionOnStartGame() {
    this._formPage.classList.add('translatePageDown');
    this._formPage.classList.remove('translatePageUp');
  }
}
