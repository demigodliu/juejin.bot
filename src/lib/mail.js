"use strict";
const { EMAIL } = require("../config");
const nodemailer = require("nodemailer");

async function main(html) {
  let transporter = nodemailer.createTransport({
    service: EMAIL.SERVICE,
    port: EMAIL.PORT,
    secureConnection: true,
    auth: {
      user: EMAIL.ACCOUNT,
      pass: EMAIL.PASSWORD
    },
  });

  let info = await transporter.sendMail({
    from: EMAIL.ACCOUNT,
    to: EMAIL.ACCOUNT,
    subject: "🤖 稀土掘金-自动化脚本执行结果",
    html,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = main;