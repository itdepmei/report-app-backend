const cron = require("node-cron");
const Report = require("../models/reportModels/reportModels");
const User = require("../models/userModel");
const sendEmail = require("./sendEmail");

const sendDailyReportReminder = async () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); 

  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + 1); 

  const sentReports = await Report.find({
    date: { $gte: now, $lt: nextDay },
    sendToAssistant: true,
  }).select("user");

  const sentUserIds = sentReports.map((report) => String(report.user));

  const usersToRemind = await User.find({
    _id: { $nin: sentUserIds },
    role: { $in: ["user", "admin"] }, 
    active: true,
    email: { $exists: true },
  });

  for (let user of usersToRemind) {
    await sendEmail({
      email: user.email,
      subject: "تنبيه بإرسال التقرير اليومي",
      message: `مرحبًا ${user.name}،\n\nنذكرك بإرسال تقريرك اليومي قبل نهاية اليوم.\n\nمع التحية.`
    });
  }

  console.log(`[${new Date().toLocaleTimeString()}] Reminder sent to ${usersToRemind.length} users.`);
};

cron.schedule("0 14 * * *", sendDailyReportReminder);