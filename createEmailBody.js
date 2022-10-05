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
