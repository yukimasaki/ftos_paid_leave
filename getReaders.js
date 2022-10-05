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
