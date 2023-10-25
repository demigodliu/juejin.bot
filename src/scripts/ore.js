const request = require('../lib/request');
const { API } = require('../config');

class Ore {
  constructor(user) {
    this.user = user;
  }

  async main() {
    return await this.getCurrentPoint();
  }

  /** 获取当前用户的矿石数量 */
  async getCurrentPoint() {
    try {
      const { user } = this;
      const options = {
        url: API.ORE,
        method: "GET",
        headers: { "cookie": `sessionid=${user.SESSIONID}` }
      }
      return JSON.parse((await request(API.ORE, options)).body).data;
    } catch (err) {
      return 0;
    }
  }
}

module.exports = Ore;