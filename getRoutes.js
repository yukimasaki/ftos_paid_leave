function getRoutes(department) {
  // 申請ルートをオブジェクトとして取得
  const routes = tableRoutes
  .select(['order', 'email', 'role'])
  .where({'department': ['==', department]})
  .sort([{order: true}]) //昇順でソート
  .result(false);

  return routes;
}