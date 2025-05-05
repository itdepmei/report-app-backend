// const { Client } = require('whatsapp-web.js');
// const cron = require('node-cron');
// const qrcode = require('qrcode-terminal');

// // إنشاء عميل WhatsApp
// const client = new Client();

// // عرض رمز الاستجابة السريعة عند بدء الاتصال
// client.on('qr', (qr) => {
//     qrcode.generate(qr, { small: true });
// });

// // عند الاتصال بنجاح، سيتم تنفيذ هذه الدالة
// client.on('ready', () => {
//     console.log('العميل جاهز');

//     // جدولة إرسال الرسالة في الساعة 9:39 صباحًا يوميًا
//     cron.schedule('55 9 * * *', () => {
//         const userPhone = 'whatsapp:+9647717918195';  // رقم الهاتف الذي سترسل له الرسالة

//         // إرسال الرسالة عبر WhatsApp
//         client.sendMessage(userPhone, 'مرحباً، لم تقم بإرسال تقريرك اليوم. يرجى إرساله الآن.')
//             .then(() => {
//                 console.log('تم إرسال الرسالة بنجاح');
//             })
//             .catch(err => {
//                 console.error('خطأ في إرسال الرسالة:', err);
//             });
//     });
// });

// // بدء العميل
// client.initialize();