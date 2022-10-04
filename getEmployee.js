function getEmployee(recipientEmail) {
  // 申請者メールアドレスで検索しオブジェクトとして返却
  const results = tableEmployees
  .select(['name', 'department'])
  .where({'email':['==', recipientEmail]})
  .result(false);

  return results;
}
