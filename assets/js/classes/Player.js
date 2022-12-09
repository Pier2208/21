import Game from './Game.js';

export default class Player extends Game {
  constructor(el) {
    super();
    this._elPlayer = el;
    this._playerBoard = this._elPlayer.querySelector('.player__board');
    this._playBtn = this._elPlayer.querySelector('.player__actions--play');
    this._holdBtn = this._elPlayer.querySelector('.player__actions--stop');
    this._playerScore = this._elPlayer.querySelector('.player__score');

    this._playerId = this._elPlayer.dataset.playerId;
    this._score = 0;
    this._playerCards = [];

    this.init();
  }

  init() {
    // comportement des boutons jouer et stop
    this._playBtn.addEventListener('click', this.play);
    this._holdBtn.addEventListener('click', this.hold);
  }

  play = e => {
    e.stopImmediatePropagation();

    // le tirage d'une carte incrémente le score de la valeur de la carte et ajoute 1 au nb de round
    const card = Game._deck.drawCard();
    this._playerCards.push(card);
    this._score += card.value;

    // mise à jour du DOM: incrémentation du score et ajout de la carte sur le board du joueur
    this._playerScore.textContent = `${this._score} points`;
    this._playerBoard.innerHTML = this._playerCards.reduce((html, card) => {
      html += `<div class='card'><img src=${card.img} alt=${card.name} /></div>`;
      return html;
    }, '');
    this._elPlayer.dataset.playerScore = this._score;

    // si le score du joueur dépasse la limite du jeu (ici 21), il est out
    if (this._score > Game._limitPoints) {
      this.isOutOfGame();
      return;
    }
    this.nextPlayer();
  }

  // quand un joueur stop sa main
  hold = (e) => {
    e.stopImmediatePropagation();
    this._elPlayer.classList.add('holding');
    this.nextPlayer();
    this._elPlayer.classList.remove('playing', 'active');
    this._elPlayer.dataset.playerScore = this._score;
  }

  // quand un joueur dépasse 21
  isOutOfGame = () => {
    this.nextPlayer();

    this._elPlayer.classList.add('out');
    this._elPlayer.insertAdjacentHTML('beforeend', '<div class="out-msg"></div>');
    this._elPlayer.classList.remove('playing');
    this._elPlayer.classList.remove('active');
  };
}
