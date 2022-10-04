function getCurrentApprover(id) {
  
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