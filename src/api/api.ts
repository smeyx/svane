import fetch from 'unfetch';

export default class NbaApi {

  apiUrl: string = 'https://data.nba.com/prod/';
  baseHeaders: Object = {
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'de, en-US',
    'Connection': 'keep-alive',
    'Host': 'data.nba.com',
    'Referer': 'https://stats.nba.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:68.0) Gecko/20100101 Firefox/68.0',
  }

  _convertToNbaDate(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n.toString();
    let month = date.getMonth();
    let year = date.getFullYear();

    return year + pad(month + 1) + pad(date.getDate());
  }
  _buildUrl(path: string, parameter: Object): string {
    let queryString: string = '';
    if(parameter) {
      Object
        .entries(parameter)
        .forEach(( [key, value] ) => {
          queryString += `&${key}=${value}`;
        });
    }

    queryString += ('&_=' + new Date().getTime());
    const url: string = this.apiUrl + path + (queryString.replace('&', '?'));

    return url;
  }

  get(path: string, parameter: Object = {}, headers: Object = {}, url: string = '') {
    console.log('fetching...', this._buildUrl(path, parameter));

    headers = { ...this.baseHeaders, ...headers };
    return fetch(this._buildUrl(path, parameter), headers);
  }
}
