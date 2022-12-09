import { cards } from '../../../data/cards.js';

export default class Deck {
  drawCard() {
    const randomNumber = Math.floor(Math.random() * 52);
    return cards[randomNumber];
  }
}
