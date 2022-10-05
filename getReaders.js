function getReaders(id_new) {
  const department = tablePaidLeaves
  .select(['department'])
  .where({'id': ['==', id_new]})
  .result(true);

  const results = tableRoutes
  .select(['email'])
  .where({
    'department': ['==', department],
    'role': ['==', '回覧']
  })
  .result(true)

  return results;
}
