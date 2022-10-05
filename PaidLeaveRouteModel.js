function getRoutes(department) {
  // 申請ルートをオブジェクトとして取得
  const routes = tableRoutes
  .select(['order', 'email', 'role'])
  .where({'department': ['==', department]})
  .sort([{order: true}]) //昇順でソート
  .result(false);

  return routes;
}

function getMaxApprovalStep(department) {
  // role=承認のレコード数を取得
  const result = tableRoutes
  .select(['role'])
  .where({
    'department': ['==', department],
    'role': ['==', '承認']
  })
  .result(true)
  .length;

  return result;
}

function getCurrentApprover(id) {
  // 2つの関数に分割した方がよさそう？
  // 現在の承認ステップ数、部署をオブジェクト形式で取得
  const results = tablePaidLeaves
  .select(['department', 'current_approval_step'])
  .where({'id': ['==', id]})
  .result(false);

  const department = results[0].department;
  const currentApprovalStep = results[0].current_approval_step;

  // 承認ステップ数に応じた承認者メールアドレスを取得
  const approverEmail = tableRoutes
  .select(['email'])
  .where({
    'department':['==', department],
    'order':['==', currentApprovalStep]
  })
  .result(true);

  return approverEmail;
}

function getReaders(id) {
  const department = tablePaidLeaves
  .select(['department'])
  .where({'id': ['==', id]})
  .result(true);

  const results = tableRoutes
  .select(['email'])
  .where({
    'department': ['==', department],
    'role': ['==', '回覧']
  })
  .result(true)

  if (results == '') {
    return false;
  } else {
    return results;
  }
}
