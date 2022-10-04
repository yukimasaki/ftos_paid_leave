function sendEmail(email, subject, body) {
  //メール送信
  GmailApp.sendEmail(email, subject, 'HTML形式のメールを表示できませんでした。', {htmlBody: body});
}