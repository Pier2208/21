import Board from './Board.js';

export default class Form extends Board {
  constructor(el) {
    super();
    this._formPage = el;
    this._elForm = this._formPage.querySelector('.form-game');
    this._startGameBtn = this._elForm.startGame;
    this._newGameBtn = document.querySelector('.new-game');
    this._error = '';
    this.init();
  }

  init() {
    // comportement des boutons start Game et new Game
    this._startGameBtn.addEventListener('click', this.handleFormSubmit);
    this._newGameBtn.addEventListener('click', this.handleNewGame);
  }

  // soumission du form et création des instances de class Player
  handleFormSubmit = e => {
    e.preventDefault();
    const nPlayers = this._elForm.nPlayers.value;
    if (nPlayers < 2 || nPlayers > 8) {
      alert('Entre 2 et 8 joueurs!');
      return;
    }

    // petite transition entre l'affichage du form et le gameboard
    this.transitionOnStartGame();

    // creation des joueurs
    for (let i = 1; i <= nPlayers; i++) {
      this.createPlayers(i);
    }

    this._elForm.reset();
    this._elForm.nPlayers.focus();
  };

  // bouton "jouer encore" qui s'affiche à la fin de la game
  handleNewGame = e => {
    e.preventDefault();
    this._formPage.classList.add('translatePageUp');
    this._formPage.classList.remove('translatePageDown');
    this._newGameBtn.classList.toggle('show');
    // suppression des DOM de joueurs
    for (let wPlayer of document.querySelectorAll('.wPlayer')) {
      wPlayer.remove();
    }
  };
}
