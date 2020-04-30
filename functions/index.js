const functions = require('firebase-functions');
const request = require('request-promise');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer QooGRo38sZF6gwPiP8wkdec0IZbtr6CwKiH84xfj0/Gyn2tOBL5Yt3/vJu//MqyQyZIe/XQBNUier1gGxCgaGh9FbL4nGaHToo+zBmGjKLLechlFvth5VMFxGraB2oCygdMKs4b74/THeyRZ7FQlWAdB04t89/1O/w1cDnyilFU=`
};

exports.LineAdapter = functions.https.onRequest((req, res) => {
  if (req.method === "POST") {
    let event = req.body.events[0]
    if (event.type === "message" && event.message.type === "text") {
      postToDialogflow(req);
    } else {
      reply(req);
    }
  }
  return res.status(200).send(req.method);
});

const reply = req => {
  return request.post({
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: req.body.events[0].replyToken,
      messages: [
        {
          type: "text",
          text: JSON.stringify(req.body)
        }
      ]
    })
  });
};

const postToDialogflow = req => {
  req.headers.host = "bots.dialogflow.com";
  return request.post({
    uri: "https://bots.dialogflow.com/line/visa-nangfa-agent-gugxhc/webhook",
    headers: req.headers,
    body: JSON.stringify(req.body)
  });
};
