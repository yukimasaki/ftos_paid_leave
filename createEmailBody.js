function createEmailBody(name, department, questions, answers) {
  // 氏名、部署を書き込む
  let emailBody =
    '氏名：' + name + '<br>' +
    '部署：' + department + '<br><br>'

  // フォームの項目名、回答内容を書き込む
  for (var i = 0, len = questions.length; i < len; i++) {
    emailBody = emailBody +
      questions[i] + '：<br>' +
      answers[i] + '<br><br>'
  }

  return emailBody;
}
