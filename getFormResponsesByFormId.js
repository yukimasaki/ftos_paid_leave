function getFormResponsesByFormId(formId) {
  // フォーム自体を取得
  const formResponses = FormApp.getActiveForm().getResponses()[formId];

  // フォーム内の各アイテムを取得
  const itemResponses = formResponses.getItemResponses();

  // 申請者のメールアドレスを取得
  const recipientEmail = formResponses.getRespondentEmail();

  // 設問を取得
  const questions = itemResponses.map(value => value.getItem().getTitle());

  // 回答を取得
  const answers = itemResponses.map(value => value.getResponse());

  const results = {
    recipientEmail,
    questions,
    answers
  };

  return results;
}
