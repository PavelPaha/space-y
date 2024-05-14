export class Client {
  /**
   * Должен возвращать имя пользователя или null
   * если пользователь не залогинен
   *
   * @return {Promise<string | null>} username
   * */
  async getUser() {
    const resp = await fetch('/api/getUser');
    const body = await resp.json();
    return body.user;
  }

  /**
   * Должен логинить пользователя с именем username
   * и возвращать его имя
   *
   * @param {string} username
   * @return {Promise<string | null>} username
   * */
  async loginUser(username) {
    const resp = await fetch('/api/loginUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: username}),
    });
    const respJson = await resp.json();
    return respJson.user;
  }

  /**
   * Должен разлогинивать текущего пользователя
   *
   * @return {void}
   * */
  async logoutUser() {
    return fetch(
        '/api/logoutUser', {
          method: 'POST'
        });
  }

  /**
   * Должен возвращать информацию о компании
   *
   * @typedef {Object} Headquarters
   * @property {string} address
   * @property {string} city
   * @property {string} state
   *
   * @typedef {Object} About
   * @property {string} founder
   * @property {string} founded
   * @property {number} employees
   * @property {string} ceo
   * @property {string} coo
   * @property {string} cto
   * @property {number} valuation
   * @property {Headquarters} headquarters
   * @property {string} summary
   * @return {Promise<About>}
   * */
  async getInfo() {
    const result = await fetch('api/about');

    const json = await result.json();

    return {
      founder: json['founder'],
      founded: json['founded'],
      employees: json['employees'],
      ceo: json['ceo'],
      coo: json['coo'],
      cto: json['cto'],
      valuation: json['valuation'],
      headquarters: json['headquarters'],
      summary: json['summary'],
    }
  }

  /**
   * Должен возвращать информацию о всех событиях
   *
   * @typedef {Object} EventBrief
   * @property {number} id
   * @property {string} title
   *
   * @return {Promise<EventBrief[]>}
   * */
  async getHistory() {
    const res = await fetch("/api/history");
    return res.json();
  }

  /**
   * Должен возвращать информацию о запрошенном событии
   *
   * @typedef {Object} EventFull
   * @property {number} id
   * @property {string} title
   * @property {string} event_date_utc
   * @property {string} details
   * @property {Object.<string, ?string>} links
   *
   * @param {number} id
   * @return {Promise<EventFull>}
   * */
  async getHistoryEvent(id) {
    const res = await fetch(`/api/history/${id}`);
    return res.json();
  }

  /**
   * Должен возвращать информацию о всех ракетах
   *
   * @typedef {Object} RocketBrief
   * @property {number} rocket_id
   * @property {string} rocket_name
   *
   * @return {Promise<RocketBrief[]>}
   * */
  async getRockets() {
    const res = await fetch("/api/rockets/");
    return res.json();
  }

  /**
   * Должен возвращать информацию о запрошенной ракете
   *
   * @typedef {Object} RocketFull
   * @property {number} rocket_id
   * @property {string} rocket_name
   * @property {string} first_flight
   * @property {string} description
   * @property {string} wikipedia
   * @property {string[]} flickr_images
   * Смотри источник данных:
   * @property {Object} height
   * @property {Object} diameter
   * @property {Object} mass
   * @property {Object} engines
   * @property {Object} first_stage
   * @property {Object} second_stage
   *
   * @param {string} id
   * @return {Promise<RocketFull>}
   * */
  async getRocket(id) {
    const res = await fetch(`/api/rockets/${id}`);
    return res.json();
  }

  /**
   * Должен возвращать информацию о машине в космосе
   *
   * @typedef {Object} Roadster
   * @property {string} name
   * @property {string} launch_date_utc
   * @property {string} details
   * @property {number} earth_distance_km
   * @property {number} mars_distance_km
   * @property {string} wikipedia
   *
   * @return {Promise<Roadster>}
   * */
  async getRoadster() {
    const res = await fetch("/api/roadster/");
    return res.json();
  }

  /**
   * Должен возвращать информацию о всех посланных на Марс предметах
   *
   * @typedef {Object} Item
   * @property {!string} id
   * @property {!string} name
   * @property {!string} phone
   * @property {?number} weight
   * @property {?string} color
   * @property {?boolean} important
   *
   * @return {Promise<Item[]>}
   * */
  async getSentToMars() {
    throw new Error("Not implemented");
  }

  /**
   * Должен посылать на марс переданный предмет и
   * возвращать информацию о всех посланных на Марс предметах
   *
   * @typedef {Object} ItemToSend
   * @property {!string} name
   * @property {!string} phone
   * @property {?number} weight
   * @property {?string} color
   * @property {?boolean} important
   *
   * @param {ItemToSend} item
   * @return {Promise<Item[]>}
   * */
  async sendToMars(item) {
    throw new Error("Not implemented");
  }

  /**
   * Должен отменять отправку на марс переданного предмета и
   * возвращать информацию о всех посланных на Марс предметах
   *
   * @param {Item} item
   * @return {Promise<Item[]>}
   * */
  async cancelSendingToMars(item) {
    throw new Error("Not implemented");
  }
}