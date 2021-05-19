import NbaApi from '../api';

export default class Game extends NbaApi {

  constructor() {
    super();
  }

  async miniBoxscore(gameId: string, gameDate: Date): Promise<Object> {
    const dateString: string = this._convertToNbaDate(gameDate);
    const response = await this.get(`/v1/${ dateString }/${ gameId }_mini_boxscore.json`);
    return response.json();
  }

  async boxscore(gameId: string, gameDate: Date): Promise<Object> {
    const dateString: string = this._convertToNbaDate(gameDate);
    const response = await this.get(`/v1/${ dateString }/${ gameId }_boxscore.json`);
    return response.json();
  }
}
