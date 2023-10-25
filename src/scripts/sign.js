const request = require('../lib/request');
const { API } = require('../config');

class Sign {
  constructor(user) {
    this.user = user;
  }

  async main() {
    /** 检查签到状态 */ 
    const signInStatus = await this.checkSignInStatus();
    if (signInStatus.err_no !== 0) return '📌 签到执行结果：操作失败。';
    if (signInStatus.data) return '📌 签到执行结果：请勿重复签到。';

    /** 开始签到 */
    const signInRes = await this.signIn();
    if (!signInRes.err_no) return '📌 签到执行结果：操作成功。';
  }

  /** 检查签到状态 */ 
  async checkSignInStatus() {
    const { user } = this;
    const options = {
      url: API.SIGNSTATUS,
      method: "GET",
      headers: { "cookie": `sessionid=${user.SESSIONID}` }
    };
    return JSON.parse((await request(API.SIGNSTATUS, options)).body);
  }

  /** 开始签到 */ 
  async signIn() {
    const { user } = this;
    const options = {
      url: API.SIGN,
      method: "POST",
      headers: {
        "cookie": `sessionid=${user.SESSIONID}`
      }
    };
    return JSON.parse((await request(API.SIGN, options)).body);
  }
}

module.exports = Sign;