// 環境設定を読み込む
settings = setSettings();

// データベース関連の設定をグローバルに宣言
// スプレッドシート「ftos_workflow」をDBとして指定
db = SSheetDB.open(settings.DB_SPREADSHEET_ID);
// 従業員テーブルを指定
tableEmployees = db.table('employees');
// 申請記録テーブルを指定
tablePaidLeaves = db.table('paid_leaves');
// 申請ルートテーブルを指定
tableRoutes = db.table('routes');

// メイン処理
async function onFormSubmit(e) {

  // イベントオブジェクトを渡してフォームから回答内容を取得する
  // 申請者のメールアドレス = formResponses[i].recipientEmail
  // 設問 = formResponses.questions[i]
  // 回答 = formResponses.answers[i]
  const formResponses = getFormResponses(e);

  // 申請者の情報を取得
  // 氏名 = employee[0].name
  // 部署 = employee[0].department
  const employee = getEmployee(formResponses.recipientEmail);

  // レコードIDをフォームIDから作成
  const id_new = getFormIdByEvent(e);

  // トークンを作成
  const token = createId(25, 36);

  // storePaidLeaveに渡すargsオブジェクト
  const args = {
    formId: id_new,
    recipientEmail: formResponses.recipientEmail,
    answers: formResponses.answers,
    name: employee[0].name,
    department: employee[0].department,
    maxApprovalStep: getMaxApprovalStep(employee[0].department),
    date: getToday(),
    token: token
  };
  // フォームの回答内容をスプレッドシートに挿入する
  await storePaidLeave(id_new, args);

  // 承認者のメールアドレスを取得
  const approverEmail = getCurrentApprover(id);

  // メール本文を生成
  let emailBody = createEmailBody(employee, formResponses);
  emailBody = emailBody + addApprovalLink(id, token);

  // 件名を作成
  const subject = '[承認依頼] 休暇申請 申請者：' + employee[0].name;

  // 承認者にメールを送信
  sendEmail(approverEmail, subject, emailBody);

}
