// role=承認のレコード数を取得
function getMaxApprovalStep(department) {
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
