const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//exports.LineBot = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
//});

const request = require('request-promise');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer QooGRo38sZF6gwPiP8wkdec0IZbtr6CwKiH84xfj0/Gyn2tOBL5Yt3/vJu//MqyQyZIe/XQBNUier1gGxCgaGh9FbL4nGaHToo+zBmGjKLLechlFvth5VMFxGraB2oCygdMKs4b74/THeyRZ7FQlWAdB04t89/1O/w1cDnyilFU=`
};

exports.LineBotReply = functions.https.onRequest((req, res) => {
  if (req.body.events[0].message.type !== 'text') {
    return;
  }
  reply(req.body);
});

const reply = (bodyResponse) => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: `text`,
          text: bodyResponse.events[0].message.text + ' 5556666 from mac with adding comment for new commit'
        }
	  ]
    })
  });
};
