const request = require('../lib/request');
const { API } = require('../config');
const random = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

class Lucky {
  constructor(user) {
    this.user = user;
  }

  async main() {
    const list = await this.getList();
    const index = random(list.data.lotteries.length - 1);
    const res = await this.dipLucky(list, index);
    if (res.err_no !== 0) return `🍀 沾喜气的结果：失败。`;
    if (res.data.has_dip) return `🍀 沾喜气的结果：重复，当前值 ${res.data.total_value} 点。`;
    if (res.data.dip_action === 1) return `🍀 沾喜气的结果：成功，当前值 ${res.data.total_value} 点。`;
  }

  /** 获取可沾喜气用户的列表 */
  async getList() {
    try {
      const { user } = this;
      const options = {
        url: API.LUCKYUSERS,
        method: "POST",
        headers: { "cookie": `sessionid=${user.SESSIONID}` },
        body: JSON.stringify({ page_no: 1, page_size: 5 }),
      }
      return JSON.parse((await request(API.LUCKYUSERS, options)).body);
    } catch (err) {
    }
  }

  /** 沾喜气 */
  async dipLucky(list, index) {
    const { user } = this;
    const options = {
      url: API.DIPLUCKY,
      method: "POST",
      headers: { "cookie": `sessionid=${user.SESSIONID}` },
      body: JSON.stringify({ lottery_history_id: list.data.lotteries[index].history_id }),
    }
    return JSON.parse((await request(API.DIPLUCKY, options)).body);
  }
}

module.exports = Lucky;