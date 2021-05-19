import NbaApi from '../api';

export default class League extends NbaApi {

  constructor() {
    super();
  }

  async todayScores() {
    const response = await this.get('/v3/today.json');
    return response.json();
  }

  async fetchStandings() {
    const response = await this.get('/v1/current/standings_all.json');
    return response.json();
  }

  async scoreboard(date: Date) {
    const dateString = this._convertToNbaDate(date);
    const response = await this.get(`/v1/${dateString}/scoreboard.json`);
    return response.json();
  }
}
