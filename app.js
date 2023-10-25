const Koa = require('koa');
const app = new Koa();
const schedule = require("node-schedule");
const { USERS } = require("./src/config");
const Ore = require("./src/scripts/ore");
const Sign = require("./src/scripts/sign");
const Lucky = require("./src/scripts/lucky");
const Lottery = require("./src/scripts/lottery");
const sendMail = require("./src/lib/mail");

const main = () => {
  USERS.map((user, index) => {
    setTimeout(async () => {
      /** 获取昨日的矿石数 */
      const yesterdayOrePoint = await (new Ore(user)).main();
      const yesterdayOrePointMsg = yesterdayOrePoint !== 0
        ? `💎 昨日矿石数量：${yesterdayOrePoint}个。`
        : `💎 昨日矿石数量：获取失败！`;
      
      /** 签到 */
      const signMsg = await (new Sign(user)).main();

      /** 沾喜气 */
      const LuckyMsg = await (new Lucky(user)).main();

      /** 抽奖 */
      const LotteryMsg = await (new Lottery(user)).main();

      /** 获取当前的矿石数 */
      const todayOrePoint = await (new Ore(user)).main();
      const todayOreIncreaseMsg = `📈 今日矿石数量：${todayOrePoint}个, 日新增 ${todayOrePoint - yesterdayOrePoint} 个。`

      sendMail(`
        执行账号「${user.NICKNAME}」结果如下所示：<br><br>
        ${yesterdayOrePointMsg}<br><br>
        ${signMsg}<br><br>
        ${LuckyMsg}<br><br>
        ${LotteryMsg}<br><br>
        ${todayOreIncreaseMsg}<br><br>
      `);
    }, 3e3 * index);
  });
};

app.listen(3000, () => {
  console.log('[3000]服务器启动成功！');
  schedule.scheduleJob('01 00 00 * * *', () => { main() });
});
