function addApprovalLink(id_new, token) {
  // ウェブアプリURL
  const url = settings.WEB_APP_URL;

  //承認・否認のリンクを書き込む
  const approvalLink =
    '<a href=' + url + '&id_new=' + id_new + '&is_approved=true&token=' + token + '>承認</a>　' +
    '<a href=' + url + '&id_new=' + id_new + '&is_approved=false&token=' + token + '>否認</a>'

  return approvalLink;
}
