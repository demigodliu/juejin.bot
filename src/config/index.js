// 任务执行对象配置
const USERS = [
  {
    NICKNAME: "",
    SESSIONID: "",
  },
];

// 邮箱配置
const EMAIL = {
  SERVICE: 'qq',
  PORT: 465,
  ACCOUNT: "",
  PASSWORD: "",
};

// API 配置
const API = {
  ORE: "https://api.juejin.cn/growth_api/v1/get_cur_point",
  SIGNSTATUS: "https://api.juejin.cn/growth_api/v1/get_today_status",
  SIGN: "https://api.juejin.cn/growth_api/v1/check_in",
  LUCKYUSERS: "https://api.juejin.cn/growth_api/v1/lottery_history/global_big",
  DIPLUCKY: "https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky",
  LOTTERYSTATUS: "https://api.juejin.cn/growth_api/v1/lottery_config/get",
  LOTTERY: "https://api.juejin.cn/growth_api/v1/lottery/draw",
};

module.exports = { USERS, EMAIL, API };