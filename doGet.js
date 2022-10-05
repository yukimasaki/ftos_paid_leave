function doGet(e) {
  // 画面に表示するメッセージ
  let htmlMessage = "";

  // URLから受け取ったパラメータを代入
  const paramIsApproved = e.parameters.is_approved;
  const paramToken = e.parameters.token;
  const id_new  = e.parameters.id_new;

  // 二重送信の場合は処理を中止する
  if (isTokenMismatch(id_new, paramToken)) {

    // 二重送信である旨をメッセージに記載する
    htmlMessage = '二重送信です。すでにステータスは変更されています。';

  // 二重送信でない場合は処理を続行する
  } else {

    // メールの「承認」リンクがクリックされた場合
    if (paramIsApproved == 'true') {

      // 承認の途中段階である場合
      if (isPendingApproval(id_new)) {

        const status = '承認中';
        const token = createId(25, 36);
        let currentApprovalStep = getCurrentApprovalStep(id_new);
        currentApprovalStep++;

        // updatePaidLeaveに渡すargsオブジェクト
        const args = {
          status: status,
          token: token,
          currentApprovalStep: currentApprovalStep
        };

        // スプレッドシートのレコードを更新する
        updatePaidLeave(id_new, args);
        htmlMessage = '承認しました。';

        // 次の承認者にメールを送信する

        // フォームIDを渡してフォームから回答内容を取得する
        const formResponses = getFormResponsesById(id_new);

        // 申請者の情報を取得
        const employee = getEmployee(formResponses.recipientEmail);

        // 承認者のメールアドレスを取得
        const approverEmail = getCurrentApprover(id);

        // メール本文を生成
        let emailBody = createEmailBody(employee, formResponses);
        emailBody = emailBody + addApprovalLink(id, token);

        // 件名を作成
        const subject = '[承認依頼] 休暇申請 申請者：' + employee[0].name;

        // 承認者にメールを送信
        sendEmail(approverEmail, subject, emailBody);

      //承認の最終段階である場合
      } else {

        const status = '承認完了';
        const token = createId(25, 36);
        const currentApprovalStep = getCurrentApprovalStep(id);

        // updatePaidLeaveに渡すargsオブジェクト
        const args = {
          status: status,
          token: token,
          currentApprovalStep: currentApprovalStep
        };

        // スプレッドシートのレコードを更新する
        updatePaidLeave(id, args);

        htmlMessage = '承認を完了しました。';

        // 申請者に承認完了を知らせるメールを送信する

        // フォームIDを渡してフォームから回答内容を取得する
        const formResponses = getFormResponsesById(id_new);

        // 申請者の情報を取得
        const employee = getEmployee(formResponses.recipientEmail);

        // メール本文を生成
        const emailBody = createEmailBody(employee, formResponses);

        // 件名を作成
        const subject = '[回覧][承認されました] 休暇申請 申請者：' + employee[0].name;

        // 申請者にメールを送信
        sendEmail(formResponses.recipientEmail, subject, emailBody);

        // 回覧者にメールを送信する
        if (getReaders(id) == '') {
          ;
        } else {
          const readersArray = getReaders(id);
          const readersString = readersArray.join(',');
          sendEmail(readersString, subject, emailBody);
        }
      }

    // メールの「否認」リンクがクリックされた場合
    } else {

      const status = '否認';
      const token = createId(25, 36);
      const currentApprovalStep = getCurrentApprovalStep(id);

      // updatePaidLeaveに渡すargsオブジェクト
      const args = {
        status: status,
        token: token,
        currentApprovalStep: currentApprovalStep
      };

      // スプレッドシートのレコードを更新する
      updatePaidLeave(id, args);

      htmlMessage = '否認しました。';

      // 申請者に否認を知らせるメールを送信する

      // フォームIDを渡してフォームから回答内容を取得する
      const formResponses = getFormResponsesById(id_new);

      // 申請者の情報を取得
      const employee = getEmployee(formResponses.recipientEmail);

      // メール本文を生成
      const emailBody = createEmailBody(employee, formResponses);

      // 件名を作成
      const subject = '[回覧][否認されました] 休暇申請 申請者：' + employee[0].name;

      // 申請者にメールを送信
      sendEmail(formResponses.recipientEmail, subject, emailBody);

      // 回覧者にメールを送信する
      if (getReaders(id) == '') {
        ;
      } else {
        const readersArray = getReaders(id);
        const readersString = readersArray.join(',');
        sendEmail(readersString, subject, emailBody);
      }
    }
  }

  return HtmlService.createHtmlOutput(htmlMessage);
}
