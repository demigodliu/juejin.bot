const request = require('../lib/request');
const { API } = require('../config');

class Lottery {
  constructor(user) {
    this.user = user;
  }

  async main() {
    const status = await this.checkLotteryStatus();
    if (status.err_no !== 0) return `🎁 抽奖执行结果：获取抽奖状态失败。`;
    if (status.data.free_count === 0) return `🎁 抽奖执行结果：今日已免费抽奖。`;
    const draw = await this.lottery();
    if (draw.err_no !== 0) return `🎁 抽奖执行结果：操作失败。`; 
    return `🎁 抽奖执行结果：${draw.data.lottery_name}。`;
  }

  /** 检查是否已经抽奖 */
  async checkLotteryStatus() {
    const { user } = this;
    const options = {
      url: API.LOTTERYSTATUS,
      method: "GET",
      headers: { "cookie": `sessionid=${user.SESSIONID}` },
    }
    return JSON.parse((await request(API.LOTTERYSTATUS, options)).body);
  }

  async lottery() {
    const { user } = this;
    const options = {
      url: API.LOTTERY,
      method: "POST",
      headers: { "cookie": `sessionid=${user.SESSIONID}` },
    }
    return JSON.parse((await request(API.LOTTERY, options)).body);
  }
}

module.exports = Lottery;