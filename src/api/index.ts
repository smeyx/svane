import League from './league';
import Game from './game';

export default class Nba {

  addHeaders(additionalHeaders: Object): void {
  }

  api(endpoint: string): any {
    endpoint = endpoint.toLowerCase();

    switch(endpoint) {
      case 'league':
        return new League();
        break;
      case 'game': 
        return new Game();
        break;
      default: 
        throw new Error('No such endpoint.');
    }
  }
}
