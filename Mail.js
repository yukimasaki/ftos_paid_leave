function addApprovalLink(id, token) {
  // ウェブアプリURL
  const url = settings.WEB_APP_URL;

  //承認・否認のリンクを書き込む
  const approvalLink =
    '<a href=' + url + '&id=' + id + '&is_approved=true&token=' + token + '>承認</a>　' +
    '<a href=' + url + '&id=' + id + '&is_approved=false&token=' + token + '>否認</a>'

  return approvalLink;
}

function createEmailBody(employee, formResponses) {
  // 氏名、部署を書き込む
  let emailBody =
    '氏名：' + employee[0].name + '<br>' +
    '部署：' + employee[0].department + '<br><br>'

  // フォームの項目名、回答内容を書き込む
  for (var i = 0, len = formResponses.questions.length; i < len; i++) {
    emailBody = emailBody +
    formResponses.questions[i] + '：<br>' +
    formResponses.answers[i] + '<br><br>'
  }

  return emailBody;
}

function sendEmail(email, subject, body) {
  //メール送信
  GmailApp.sendEmail(email, subject, 'HTML形式のメールを表示できませんでした。', {htmlBody: body});
}
